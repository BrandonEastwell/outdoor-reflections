import {Injectable} from "@nestjs/common";
import {UserRepository} from "./user.repository";

@Injectable()
export class UserService {
    constructor(private repo: UserRepository) {}

    createUser(username: string, password: string) {
        return this.repo.createUser(username, password)
    }

    findUserByID(id: number) {

    }

    findUserByUsername(username: string) {
        return this.repo.getUserByUsername(username)
    }

    deleteUser() {

    }
}