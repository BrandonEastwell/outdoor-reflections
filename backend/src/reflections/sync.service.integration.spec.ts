import {Test, type TestingModule} from "@nestjs/testing";
import {DatabaseModule} from "../database/database.module";
import {PrismaService} from "../database/prisma.service";
import {ReflectionsRepository} from "./reflections.repository";
import {SyncService} from "./sync.service";
import {ReflectionDto} from "./reflection.types";
import {ConfigModule} from "@nestjs/config";
import {seedExplicitReflections} from "../database/db.seed.helpers";

describe("SyncService integration", () => {
    let app: TestingModule;
    let prisma: PrismaService;
    let syncService: SyncService;
    let user: { id: number; email: string };
    const reflectionId = "11111111-1111-1111-1111-111111111111";

    beforeAll(async () => {
        app = await Test.createTestingModule({
            imports: [
                DatabaseModule,
                ConfigModule.forRoot({
                    isGlobal: true,
                    envFilePath: ".env.test",
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

        user = await seedExplicitReflections(prisma, reflectionId)
    });

    afterAll(async () => {
        await app.close();
        await prisma.$disconnect();
    });

    it("updates an existing reflection and returns a success response", async () => {
        const baseDate = new Date("2026-08-13T09:00:00.000Z");
        const nextDate = new Date("2026-08-13T10:30:00.000Z");

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
            lastEditedAt: new Date("2026-08-01T09:00:00.000Z"),
        });
        expect(persisted!.date.toISOString()).toBe("2026-08-13T00:00:00.000Z");
    });
});
