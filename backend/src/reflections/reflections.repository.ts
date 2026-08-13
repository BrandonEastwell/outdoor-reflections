import {Injectable} from "@nestjs/common";
import {PrismaService} from "../database/prisma.service";
import {ReflectionResponseDto, toReflectionResponseDto} from "../interfaces/reflection.types";

@Injectable()
export class ReflectionsRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(dto: ReflectionResponseDto, userId: number): Promise<ReflectionResponseDto> {
        const reflection = await this.prisma.reflection.create({
            data: {
                id: dto.id,
                userId,
                title: dto.title,
                content: dto.content,
                date: new Date(dto.date),
                drawingPaths: dto.drawingPaths,
            }
        });

        return toReflectionResponseDto(reflection);
    }

    async delete(reflectionId: string, userId: number): Promise<ReflectionResponseDto | null> {
        const reflection = await this.prisma.reflection.findFirst({
            where: {
                id: reflectionId,
                userId,
            },
        });

        if (!reflection) {
            return null;
        }

        const deleted = await this.prisma.reflection.delete({
            where: {
                id: reflectionId,
            },
        });

        return toReflectionResponseDto(deleted);
    }

    async upsert(reflectionEntries: ReflectionResponseDto[], userId: number) {
        if (reflectionEntries.length === 0) {
            return [];
        }

        return this.prisma.$transaction(async (tx) => {
            for (const entry of reflectionEntries) {
                const existing = await tx.reflection.findUnique({
                    where: { id: entry.id },
                    select: {
                        userId: true,
                        updatedAt: true
                    }
                });

                if (existing && existing.userId !== userId) {
                    continue;
                }

                if (existing && existing.updatedAt > new Date(entry.updatedAt)) {
                    continue;
                }

                return this.prisma.reflection.upsert({
                    where: { id: entry.id },

                    create: {
                        id: entry.id,
                        userId,
                        title: entry.title,
                        content: entry.content,
                        date: new Date(entry.date),
                        drawingPaths: entry.drawingPaths,
                        createdAt: new Date(entry.createdAt),
                        lastSyncedAt: new Date(),
                        updatedAt: new Date(entry.updatedAt),
                    },

                    update: {
                        title: entry.title,
                        content: entry.content,
                        date: new Date(entry.date),
                        drawingPaths: entry.drawingPaths,
                        lastSyncedAt: new Date(),
                        updatedAt: new Date(entry.updatedAt),
                    },
                })
            }}
        );
    }
}