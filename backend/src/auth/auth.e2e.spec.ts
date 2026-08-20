import {ExecutionContext, INestApplication} from "@nestjs/common";
import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../app.module";
import {ConfigModule} from "@nestjs/config";
import request from "supertest";
import {GoogleAuthGuard} from "./google-auth-guard";
import {LocalAuthGuard} from "./local-auth-guard";
import {JwtAuthGuard} from "./jwt-auth-guard";
import {PrismaService} from "../database/prisma.service";
import * as bcrypt from "bcryptjs";


describe('Auth flow end to end tests', () => {
    let app: INestApplication;
    let prisma: PrismaService;

    beforeAll(async () => {
        const googleUser = {
            googleId: 'google-123',
            email: 'test@example.com',
            firstName: 'Test',
            lastName: 'User',
        };

        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule,
                ConfigModule.forRoot({
                    isGlobal: true,
                    envFilePath: ".env.test",
                }),
            ]
        }).overrideGuard(GoogleAuthGuard)
            .useValue({
                canActivate(context: ExecutionContext) {
                    const request = context.switchToHttp().getRequest();
                    request.user = googleUser;
                    return true;
                },
            })
            .overrideGuard(LocalAuthGuard)
            .useValue({
                async canActivate(context: ExecutionContext) {
                    const request = context.switchToHttp().getRequest();
                    const user = request.body?.email
                        ? await prisma.userAccount.findUnique({ where: { email: request.body.email } })
                        : await prisma.userAccount.findFirst();

                    request.user = user
                        ? { id: user.id, email: user.email }
                        : { id: 1, email: request.body?.email ?? 'local@example.com' };
                    return true;
                },
            })
            .overrideGuard(JwtAuthGuard)
            .useValue({
                async canActivate(context: ExecutionContext) {
                    const request = context.switchToHttp().getRequest();
                    const user = await prisma.userAccount.findFirst();
                    request.user = user
                        ? { id: user.id, email: user.email }
                        : { id: 1, email: 'local@example.com' };
                    return true;
                },
            }).compile()

        app = module.createNestApplication();
        await app.init();

        prisma = module.get(PrismaService);
    })

    beforeEach(async () => {
        await prisma.refreshToken.deleteMany();
        await prisma.userAccount.deleteMany();
    })

    afterAll(async () => {
        await app.close();
    })

    it('POST auth/register creates a local user', async () => {
        const email = `register-${Date.now()}@example.com`;
        const password = 'password123';

        await request(app.getHttpServer())
            .post('/auth/register')
            .send({ email, password })
            .expect(201)

        const createdUser = await prisma.userAccount.findUnique({
            where: { email },
        });

        expect(createdUser).not.toBeNull();
        const storedPassword = createdUser?.password;
        expect(storedPassword).not.toBeNull();
        expect(storedPassword).not.toBe(password);
        expect(await bcrypt.compare(password, storedPassword!)).toBe(true);
    });

    it('POST auth/login sets auth cookies for the signed-in user', async () => {
        const email = `login-${Date.now()}@example.com`;
        const password = 'password123';

        await request(app.getHttpServer())
            .post('/auth/register')
            .send({ email, password })
            .expect(201);

        const user = await prisma.userAccount.findUnique({
            where: { email },
        });

        expect(user).not.toBeNull();

        const response = await request(app.getHttpServer())
            .post('/auth/login')
            .send({ email, password })
            .expect(201);

        expect(response.headers['set-cookie']).toBeDefined();
        expect(response.headers['set-cookie']).toEqual(
            expect.arrayContaining([
                expect.stringContaining('access_token='),
                expect.stringContaining('refresh_token='),
            ]),
        );
    });

    it('POST auth/logout clears the auth cookies', async () => {
        const response = await request(app.getHttpServer())
            .post('/auth/logout')
            .expect(200);

        expect(response.body).toEqual({ message: 'Logged out' });
        expect(response.headers['set-cookie']).toEqual(
            expect.arrayContaining([
                expect.stringContaining('access_token=;'),
                expect.stringContaining('refresh_token=;'),
            ]),
        );
    });

    it('POST auth/refresh returns new tokens when the refresh cookie is present', async () => {
        const email = `refresh-${Date.now()}@example.com`;
        const password = 'password123';

        await request(app.getHttpServer())
            .post('/auth/register')
            .send({ email, password })
            .expect(201);

        const loginResponse = await request(app.getHttpServer())
            .post('/auth/login')
            .send({ email, password })
            .expect(201);

        const setCookies = loginResponse.headers['set-cookie'];
        expect(setCookies).toBeDefined();
        const refreshCookie = Array.isArray(setCookies)
            ? setCookies.find((cookie: string) => cookie.startsWith('refresh_token='))
            : undefined;

        expect(refreshCookie).toBeDefined();

        const response = await request(app.getHttpServer())
            .post('/auth/refresh')
            .set('Cookie', refreshCookie.split(';')[0])
            .expect(201);

        expect(response.body.access_token).toBeDefined();
        expect(response.body.refresh_token).toBeDefined();
    });

    it('POST auth/refresh rejects when the refresh cookie is missing', async () => {
        const response = await request(app.getHttpServer())
            .post('/auth/refresh')
            .expect(401);

        expect(response.body.message).toBe('User is not signed in');
    });

    it('GET auth/google returns successfully through the guard', async () => {
        await request(app.getHttpServer())
            .get('/auth/google')
            .expect(200);
    });

    it('GET auth/google/callback returns login tokens', async () => {
        const response = await request(app.getHttpServer())
            .get('/auth/google/callback')
            .expect(200)

        expect(response.body.access_token).toBeDefined();
        expect(response.body.refresh_token).toBeDefined();
    })

    it('GET auth/google/callback called twice returns a 409 conflict', async () => {
        await request(app.getHttpServer())
            .get('/auth/google/callback')
            .expect(200)

        const res = await request(app.getHttpServer())
            .get('/auth/google/callback')
            .expect(409)

        expect(res.body.message).toBe('User already signed in on this device');
    })
})
