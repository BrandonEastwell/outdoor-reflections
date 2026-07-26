import {ConflictException, Injectable, UnauthorizedException} from "@nestjs/common";
import {SafeUser} from "../interfaces/user.types";
import {UserService} from "../user/user.service";
import * as bcrypt from 'bcryptjs';
import {JwtService} from "@nestjs/jwt";
import {CredentialsDto} from "./auth.dto";

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async validateUser(email: string, password: string): Promise<SafeUser> {
        const user = await this.userService.findUserByEmail(email);
        if (!user) throw new UnauthorizedException('Invalid email or password');

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException('Invalid email or password');

        const { password: _, ...safeUser } = user;
        return safeUser
    }

    async registerUser(credentials: CredentialsDto) {
        const userExists = await this.userService.findUserByEmail(credentials.email);
        if (userExists) throw new ConflictException('An account with this email already exists');

        return this.userService.createUser(credentials.email, credentials.password)
    }

    async createToken(user: SafeUser) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: await this.jwtService.signAsync(payload)
        };
    }
}
