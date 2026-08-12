import {ConflictException, Injectable, Logger} from "@nestjs/common";
import {UserRepository} from "./user.repository";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UserService {
    constructor(private repo: UserRepository) {}
    private readonly logger = new Logger(UserService.name)

    async createUser(email: string, password: string) {
        this.logger.log(`Creating user with email: ${email}`)
        const existingUser = await this.findUserByEmail(email);
        if (existingUser) throw new ConflictException('User already exists');

        const hashedPassword = await bcrypt.hash(password, 10);
        return this.repo.createUser(email, hashedPassword)
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
