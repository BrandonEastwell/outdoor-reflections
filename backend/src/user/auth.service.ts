import {UserService} from "./user.service";
import {Injectable} from "@nestjs/common";

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    validateUser(username: string, password: string) {

    }

}