import {ConflictException, Injectable, UnauthorizedException} from "@nestjs/common";
import {UserDto} from "../interfaces/user.types";
import {UserService} from "../user/user.service";
import * as bcrypt from 'bcryptjs';
import {JwtService} from "@nestjs/jwt";
import {CredentialsDto} from "./auth.dto";

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async validateUser(email: string, password: string): Promise<Omit<UserDto, 'password'>> {
        const user = await this.userService.findUserByEmail(email);
        if (!user) throw new UnauthorizedException('Invalid email or password');
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException('Invalid email or password');
        const { password: _, ...safeUser } = user;
        return safeUser
    }

    async registerUser(userDTO: UserDto) {
        const userExists = await this.userService.findUserByEmail(userDTO.email);
        if (userExists) throw new ConflictException('An account with this email already exists');
        return this.userService.createUser(userDTO.email, userDTO.password)
    }

    async login(credentials: CredentialsDto) {
        const user = await this.validateUser(credentials.email, credentials.password)
        return this.createToken(user);
    }

    async createToken(user: Omit<UserDto, 'password'>) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.signAsync(payload)
        };
    }
}
