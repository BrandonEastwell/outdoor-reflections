import {Injectable} from "@nestjs/common";
import {User, UserDTO} from "../interfaces/user.types";
import {UserService} from "../user/user.service";
import * as bcrypt from 'bcryptjs';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {
    }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findUserByEmail(email);
        if (!user) throw new Error('User not found');
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) throw new Error('Invalid password');
        return user;
    }

    async registerUser(userDTO: UserDTO) {
        const userExists = await this.userService.findUserByEmail(userDTO.email);
        if (userExists) throw new Error('User already exists');

        const hashedPassword = await bcrypt.hash(userDTO.password, 10);
        return this.userService.createUser(userDTO.email, hashedPassword)
    }

    async createToken(user: User) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
}
