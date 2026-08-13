import {Injectable} from "@nestjs/common";
import {PrismaService} from "../database/prisma.service";
import {ReflectionResponseDto, toReflectionResponseDto} from "../interfaces/reflection.types";
import {Reflection} from "../../generated/prisma/client";

@Injectable()
export class ReflectionsRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(entry: ReflectionResponseDto, userId: number): Promise<ReflectionResponseDto> {
        const reflection = await this.prisma.reflection.create({
            data: {
                id: entry.id,
                userId,
                title: entry.title,
                content: entry.content,
                date: new Date(entry.date),
                drawingPaths: entry.drawingPaths,
                createdAt: new Date(entry.createdAt),
                lastSyncedAt: new Date(),
                updatedAt: new Date(entry.updatedAt),
                lastEditedAt: new Date(entry.lastEditedAt)
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

    async upsertMany(reflectionEntries: ReflectionResponseDto[], userId: number) {
        const results: { entriesSynced: Reflection[], entriesCreated: Reflection[] } = { entriesSynced: [], entriesCreated: [] };
        await this.prisma.$transaction(async (tx) => {
                for (const entry of reflectionEntries) {
                    const existing = await tx.reflection.findUnique({
                        where: {id: entry.id},
                        select: {
                            userId: true,
                            lastEditedAt: true
                        }
                    });

                    if (!existing) {
                        const res = await tx.reflection.create({
                            data: {
                                id: entry.id,
                                userId,
                                title: entry.title,
                                content: entry.content,
                                date: new Date(entry.date),
                                drawingPaths: entry.drawingPaths,
                                createdAt: new Date(entry.createdAt),
                                lastSyncedAt: new Date(),
                                updatedAt: new Date(entry.updatedAt),
                                lastEditedAt: new Date(entry.lastEditedAt)
                            }
                        });

                        results.entriesCreated.push(res)
                    }

                    if (existing && existing.userId !== userId) {
                        continue;
                    }

                    if (existing && existing.lastEditedAt > new Date(entry.lastEditedAt)) {
                        continue;
                    }

                    const res = await tx.reflection.update({
                        where: {
                            id: entry.id,
                            lastEditedAt: {
                                lt: entry.lastEditedAt
                            }
                        },
                        data: {
                            title: entry.title,
                            content: entry.content,
                            date: new Date(entry.date),
                            drawingPaths: entry.drawingPaths,
                            lastSyncedAt: new Date(),
                            updatedAt: new Date(entry.updatedAt),
                        },
                    })

                    results.entriesSynced.push(res)
                }
            }
        );

        return results;
    }
}