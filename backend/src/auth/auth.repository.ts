import { PrismaService } from '../database/prisma.service';
import { Injectable } from '@nestjs/common';
import { RefreshToken } from '../../generated/prisma/client';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createRefreshSession(data: RefreshToken): Promise<RefreshToken> {
    return this.prisma.refreshToken.create({ data });
  }

  async updateRefreshToken(
    id: string,
    hashedToken: string,
  ): Promise<RefreshToken> {
    return this.prisma.refreshToken.update({
      where: {
        id,
      },
      data: {
        tokenHash: hashedToken,
      },
    });
  }

  async findRefreshToken(id: string): Promise<RefreshToken | null> {
    return this.prisma.refreshToken.findUnique({
      where: {
        id,
      },
    });
  }

  async findRefreshTokenByUser(id: number): Promise<RefreshToken | null> {
    return this.prisma.refreshToken.findFirst({
      where: {
        userId: id,
      },
    });
  }
}
