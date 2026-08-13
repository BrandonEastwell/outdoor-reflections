import type { Reflection } from '../../generated/prisma/client';
import {z} from "zod";

export const ReflectionSchema = z.object({
    id: z.string(),
    title: z.string(),
    content: z.array(z.string()),
    date: z.date(),
    drawingPaths: z.array(z.object({
        path: z.string(),
        color: z.string()
    })),
    lastSyncedAt: z.date().optional(),
    lastEditedAt: z.date(),
    createdAt: z.date(),
})

export type SyncResponse = {
    timestamp: string;
    service_name: string;
    status: "SUCCESS" | "PARTIAL" | "FAILED"
    duration_ms: number;
    count: { total: number, synced: number, failed: number }
    errors?: { entryId: string, error: string }[];
};

export type DrawPath = {
    path: string;
    color: string;
};

export type ReflectionDto = {
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

export function toReflectionDto(reflection: Reflection): ReflectionDto {
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