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

    async delete(id: string) {
        const query = "DELETE FROM reflection WHERE id=$1 RETURNING *"
        const res = await this.db.query(query, [id])
        return res.rows[0]
    }

    async upsert(reflectionEntries: Entry[]) {
        if (reflectionEntries.length === 0) {
            return [];
        }

        const values: unknown[] = [];
        const rowsSql = reflectionEntries
            .map((entry, index) => {
                const offset = index * 7;

                values.push(
                    entry.id,
                    entry.user_id,
                    entry.title,
                    entry.content,
                    entry.date,
                    JSON.stringify(entry.drawing_paths),
                    entry.created_at,
                    entry.last_synced_at,
                    entry.updated_at,
                );

                return `(
                  $${offset + 1},
                  $${offset + 2},
                  $${offset + 3},
                  $${offset + 4},
                  $${offset + 5},
                  $${offset + 6}::jsonb,
                  $${offset + 7},
                  $${offset + 8},
                  NOW(),
                  $${offset + 9},
                )`;
            })
            .join(",");

        const res = await this.db.query(
            `
                INSERT INTO reflection (
                    id,
                    user_id,
                    title,
                    content,
                    drawing_paths,
                    created_at,
                    updated_at,
                    last_synced_at
                )
                VALUES ${rowsSql}
                ON CONFLICT (id)
                DO UPDATE SET
                title = EXCLUDED.title,
                content = EXCLUDED.content,
                drawing_paths = EXCLUDED.drawing_paths,
                updated_at = EXCLUDED.updated_at,
                last_synced_at = NOW()
                WHERE reflection.updated_at < EXCLUDED.updated_at
                RETURNING *;
            `,
            values,
        );

        return res.rows;
    }
}