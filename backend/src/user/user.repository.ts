import {Injectable} from "@nestjs/common";
import {PrismaService} from "../database/prisma.service";
import type {UpdateUserData} from "./user.types";
import {UserAccount} from "../../generated/prisma/client";

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService) {}

    async getUserById(id: number) {
        return this.prisma.userAccount.findUnique({
            where: { id },
        });
    }

    async getUserByEmail(email: string) {
        return this.prisma.userAccount.findUnique({
            where: { email },
        });
    }

    async createUser(email: string, password: string) {
        return this.prisma.userAccount.create({
            data: { email, password },
        });
    }

    async createUserWithProvider(email: string, provider: { provider: "google", providerId: string }) {
        return this.prisma.$transaction(async (tx) => {
            tx.userAccount.create({
                data: { email }
            })
        })
    }

    async deleteUser(id: number) {
        return this.prisma.userAccount.delete({
            where: { id },
        });
    }

    async updateUser(id: number, userData: UpdateUserData): Promise<UserAccount> {
        return this.prisma.userAccount.update({
            where: { id },
            data: userData,
        });
    }
}
