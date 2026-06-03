import {Injectable} from "@nestjs/common";
import {UserDTO} from "../interfaces/user.types";
import {UserService} from "../user/user.service";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {
    }

    async validateUser(username: string, password: string) {
        const user = (await this.userService.findUserByUsername(username)).rows[0];
        if (!user) throw new Error('User not found');
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) throw new Error('Invalid password');
        return user;
    }

    async registerUser(userDTO: UserDTO) {
        const userExists = await this.userService.findUserByUsername(userDTO.username);
        if (userExists) throw new Error('User already exists');

        const hashedPassword = await bcrypt.hash(userDTO.password, 10);
        return this.userService.createUser(userDTO.username, hashedPassword)
    }
}

