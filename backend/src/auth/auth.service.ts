import {Injectable} from "@nestjs/common";
import {UserDTO} from "../interfaces/user.types";
import {UserService} from "../user/user.service";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {
    }

    validateUser(username: string, password: string) {

    }

    async register(userDTO: UserDTO) {
        const userExists = await this.userService.findUserByUsername(userDTO.username);
        if (userExists) throw new Error('User already exists');

        const hashedPassword = await bcrypt.hash(userDTO.password, 10);
        return this.userService.createUser(userDTO.username, hashedPassword)
    }
}

