import {ConflictException, Injectable, UnauthorizedException} from "@nestjs/common";
import {SafeUser} from "../interfaces/user.types";
import {UserService} from "../user/user.service";
import * as bcrypt from 'bcryptjs';
import {JwtService} from "@nestjs/jwt";
import {CredentialsDto} from "./auth.dto";
import {AuthRepository} from "./auth.repository";
import {REFRESH_TOKEN_AGE_DAYS} from "./constants";
import {RefreshToken} from "../../generated/prisma/client";

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private authRepository: AuthRepository, private jwtService: JwtService) {}

    async validateUser(email: string, password: string): Promise<SafeUser> {
        const user = await this.userService.findUserByEmail(email);
        if (!user) throw new UnauthorizedException('Invalid email or password');

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException('Invalid email or password');

        const { password: _, ...safeUser } = user;
        return safeUser
    }

    async register(credentials: CredentialsDto) {
        return this.userService.createUser(credentials.email, credentials.password)
    }

    async login(user: SafeUser) {
        const exists = await this.authRepository.findRefreshToken(user.id, 'all');
        if (exists) throw new ConflictException('User already signed in on this device');

        const token = await this.createToken(user);
        const hashedToken = await bcrypt.hash(token.refresh_token, 10);
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_AGE_DAYS);

        const tokenToSave: Omit<RefreshToken, 'id'> = {
            userId: user.id,
            tokenHash: hashedToken,
            device: 'all',
            expiresAt: expiresAt
        }

        await this.authRepository.saveRefreshToken(tokenToSave)
        return { access_token: token.access_token }
    }

    async createToken(user: SafeUser) {
        const payload = { email: user.email, sub: user.id };
        return {
            refresh_token: await this.jwtService.signAsync(payload, { expiresIn: `${REFRESH_TOKEN_AGE_DAYS}d` }),
            access_token: await this.jwtService.signAsync(payload)
        };
    }
}
