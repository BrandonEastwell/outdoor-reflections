import type { Reflection } from '../../generated/prisma/client';

export type DrawPath = {
    path: string;
    color: string;
};

export type ReflectionResponseDto = {
    id: string;
    title: string;
    content: string[];
    date: string;
    drawingPaths: DrawPath[];
    lastSyncedAt: string | null;
    lastEditedAt: string;
    createdAt: string;
    updatedAt: string;
};

export function toReflectionResponseDto(reflection: Reflection): ReflectionResponseDto {
    return {
        id: reflection.id,
        title: reflection.title,
        content: reflection.content,
        date: reflection.date.toISOString(),
        drawingPaths: reflection.drawingPaths as DrawPath[],
        lastSyncedAt: reflection.lastSyncedAt?.toISOString() ?? null,
        createdAt: reflection.createdAt.toISOString(),
        updatedAt: reflection.updatedAt.toISOString(),
        lastEditedAt: reflection.lastEditedAt.toISOString()
    };
}