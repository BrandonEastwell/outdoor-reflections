import {PrismaService} from "../database/prisma.service";
import {ConflictException, Injectable} from "@nestjs/common";
import {RefreshToken} from "../../generated/prisma/client";

@Injectable()
export class AuthRepository {
    constructor(private readonly prisma: PrismaService) {}

    async saveRefreshToken(data: Omit<RefreshToken, 'id'>): Promise<boolean> {
        const savedToken = await this.prisma.refreshToken.create({data});
        return !!savedToken;
    }

    async findRefreshToken(userId: number, device: string): Promise<RefreshToken | null> {
        return this.prisma.refreshToken.findFirst({
            where: {
                userId,
                device
            }
        })
    }
}