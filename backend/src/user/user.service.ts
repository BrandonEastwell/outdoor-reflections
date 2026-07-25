import {Injectable} from "@nestjs/common";
import {UserRepository} from "./user.repository";

@Injectable()
export class UserService {
    constructor(private repo: UserRepository) {}

    createUser(email: string, password: string) {
        return this.repo.createUser(email, password)
    }

    async findUserByID(id: number) {
        const user = await this.repo.getUserById(id);
        if (!user) return null;
        return user;
    }

    async findUserByEmail(email: string) {
        const user = await this.repo.getUserByEmail(email)
        if (!user) return null;
        return user;
    }

    deleteUser() {

    }
}
