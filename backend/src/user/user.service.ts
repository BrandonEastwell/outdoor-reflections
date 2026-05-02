import {Injectable} from "@nestjs/common";
import {UserRepository} from "./user.repository";
import {UserDTO} from "../interfaces/user.types";

@Injectable()
export class UserService {
    constructor(private repo: UserRepository) {}

    createUser(UserDTO: UserDTO) {
        
    }

    findUserByID(id: number) {

    }

    deleteUser() {

    }
}