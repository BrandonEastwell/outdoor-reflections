import { ConflictException } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { Test, type TestingModule } from "@nestjs/testing";
import * as bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";
import {AuthService} from "./auth.service.js";
import {UserService} from "../user/user.service.js";
import {AuthRepository} from "./auth.repository.js";
import {UserRepository} from "../user/user.repository.js";
import {PrismaService} from "../database/prisma.service.js";
import {ConfigModule} from "@nestjs/config";


describe("AuthService integration", () => {
    let app: TestingModule;
    let authService: AuthService;
    let userService: UserService;
    let authRepo: AuthRepository;
    let userRepo: UserRepository;
    let jwtService: JwtService;
    let prisma: PrismaService
    let nextUserId = 1;

    beforeAll(async () => {
        app = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({
                    isGlobal: true,
                    envFilePath: ".env",
                }),
                JwtModule.register({
                    secret: "test-access-secret",
                    signOptions: { expiresIn: "10m" },
                }),
            ],
            providers: [
                AuthService,
                UserService,
                PrismaService,
                UserRepository,
                AuthRepository
            ],
        }).compile();

        prisma = app.get(PrismaService);
        authService = app.get(AuthService);
        userService = app.get(UserService);
        jwtService = app.get(JwtService);
        authRepo = app.get(AuthRepository);
    });

    beforeEach(async () => {
        await prisma.refreshToken.deleteMany();
        await prisma.reflection.deleteMany();
        await prisma.userAccount.deleteMany();
        process.env.JWT_REFRESH_SECRET = "test-refresh-secret";
    });

    afterAll(async () => {
        await app.close();
        await prisma.$disconnect();
    });

    it("registers a user, persists the refresh session, and refreshes the session", async () => {
        const email = `auth-${randomUUID()}@example.com`;
        const credentials = { email, password: "password123" };

        await authService.register(credentials);

        const createdUser = await userService.findUserByEmail(email);
        expect(createdUser).not.toBeNull();

        const { password: _password, ...safeUser } = createdUser!;
        const tokens = await authService.login(safeUser);

        const storedSession = await authRepo.findRefreshTokenByUser(createdUser!.id);
        expect(storedSession).toBeDefined();
        expect(storedSession?.tokenHash).toBeTruthy();
        expect(await bcrypt.compare(tokens.refresh_token, storedSession!.tokenHash!)).toBe(true);

        const accessPayload = await jwtService.verifyAsync(tokens.access_token);
        const refreshPayload = await jwtService.verifyAsync(tokens.refresh_token, {
            secret: process.env.JWT_REFRESH_SECRET,
        });

        expect(accessPayload).toMatchObject({
            email,
            sub: createdUser!.id,
        });
        expect(refreshPayload).toMatchObject({
            sub: createdUser!.id,
        });
        expect(refreshPayload).toHaveProperty("sid");

        const refreshed = await authService.refresh(safeUser, tokens.refresh_token);
        const updatedSession = await authRepo.findRefreshToken(storedSession!.id);

        expect(updatedSession).toBeDefined();
        expect(await bcrypt.compare(refreshed.refresh_token, updatedSession!.tokenHash!)).toBe(true);
        expect(await jwtService.verifyAsync(refreshed.access_token)).toMatchObject({
            email,
            sub: createdUser!.id,
        });
    });

    it("rejects a second login while a refresh session is active", async () => {
        const email = `auth-${randomUUID()}@example.com`;
        const credentials = { email, password: "password123" };

        await authService.register(credentials);

        const createdUser = await userService.findUserByEmail(email);
        const { password: _password, ...safeUser } = createdUser!;

        await authService.login(safeUser);

        await expect(authService.login(safeUser)).rejects.toBeInstanceOf(ConflictException);
    });
});
