import {Test, type TestingModule} from "@nestjs/testing";
import {randomUUID} from "node:crypto";
import {DatabaseModule} from "../database/database.module";
import {PrismaService} from "../database/prisma.service";
import {ReflectionsRepository} from "./reflections.repository";
import {SyncService} from "./sync.service";
import {ReflectionDto} from "./reflection.types";
import {ConfigModule} from "@nestjs/config";

describe("SyncService integration", () => {
    let app: TestingModule;
    let prisma: PrismaService;
    let syncService: SyncService;

    beforeAll(async () => {
        app = await Test.createTestingModule({
            imports: [
                DatabaseModule,
                ConfigModule.forRoot({
                    isGlobal: true,
                    envFilePath: ".env",
                })
            ],
            providers: [SyncService, ReflectionsRepository],
        }).compile();

        prisma = app.get(PrismaService);
        syncService = app.get(SyncService);
    });

    beforeEach(async () => {
        await prisma.refreshToken.deleteMany();
        await prisma.reflection.deleteMany();
        await prisma.userAccount.deleteMany();
    });

    afterAll(async () => {
        await app.close();
        await prisma.$disconnect();
    });

    it("updates an existing reflection and returns a success response", async () => {
        const email = `sync-${randomUUID()}@example.com`;
        const user = await prisma.userAccount.create({
            data: {
                email,
                password: "password123",
            },
        });

        const reflectionId = randomUUID();
        const baseDate = new Date("2026-08-13T09:00:00.000Z");
        const nextDate = new Date("2026-08-13T10:30:00.000Z");

        await prisma.reflection.create({
            data: {
                id: reflectionId,
                userId: user.id,
                title: "old title",
                content: ["old content"],
                date: baseDate,
                drawingPaths: [],
                createdAt: baseDate,
                lastSyncedAt: baseDate,
                lastEditedAt: baseDate,
                updatedAt: baseDate,
            },
        });

        const entry = {
            id: reflectionId,
            title: "updated title",
            content: ["updated content"],
            date: nextDate,
            drawingPaths: [{ path: "M0 0L10 10", color: "#000000" }],
            lastSyncedAt: nextDate,
            lastEditedAt: nextDate,
            createdAt: baseDate,
            updatedAt: nextDate,
        } as unknown as ReflectionDto;

        const result = await syncService.syncEntries([entry], {
            id: user.id,
            email: user.email,
        });

        expect(result).toMatchObject({
            status: "SUCCESS",
            count: {
                total: 1,
                synced: 1,
                failed: 0,
            },
            service_name: "reflections_sync_service",
        });

        const persisted = await prisma.reflection.findUnique({
            where: { id: reflectionId },
        });

        expect(persisted).not.toBeNull();
        expect(persisted).toMatchObject({
            id: reflectionId,
            userId: user.id,
            title: "updated title",
            content: ["updated content"],
            drawingPaths: [{ path: "M0 0L10 10", color: "#000000" }],
            lastEditedAt: baseDate,
        });
        expect(persisted!.date.toISOString()).toBe("2026-08-13T00:00:00.000Z");
    });
});
