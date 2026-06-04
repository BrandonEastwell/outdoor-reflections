import {Injectable} from "@nestjs/common";
import {UserRepository} from "./user.repository";

@Injectable()
export class UserService {
    constructor(private repo: UserRepository) {}

    createUser(username: string, password: string) {
        return this.repo.createUser(username, password)
    }

    async findUserByID(id: number) {
        const user = await this.repo.getUserById(id);
        if (!user) return null;
        return user;
    }

    async findUserByUsername(username: string) {
        const user = await this.repo.getUserByUsername(username)
        if (!user) return null;
        return user;
    }

    deleteUser() {

    }
}