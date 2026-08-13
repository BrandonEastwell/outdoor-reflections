import {PrismaService} from "./prisma.service";

export const seedUser = (email: string, prisma: PrismaService) => {
    return prisma.userAccount.create({
        data: {
            email,
            password: "password123",
        },
    });
};

export const seedReflection = (
    userId: number,
    id: string,
    index: number,
    dayOffset: number,
    prisma: PrismaService
) => {
    const date = new Date(Date.UTC(2026, 7, 1 + dayOffset, 9, index % 60, 0));

    return prisma.reflection.create({
        data: {
            id,
            userId,
            title: `seeded reflection ${index}`,
            content: [`seeded content ${index}`, `seeded detail ${index}`],
            date,
            drawingPaths: [
                { path: `M0 ${index}L10 ${index + 10}`, color: index % 2 === 0 ? "#111111" : "#222222" },
            ],
            createdAt: date,
            lastSyncedAt: date,
            lastEditedAt: date,
            updatedAt: date,
        },
    });
};

export const seedExplicitReflections = async (prisma: PrismaService, reflectionId: string) => {
    const primaryUser = await prisma.userAccount.create({
        data: {
            email: "primary.sync@example.com",
            password: "password123",
        },
    });

    const archiveUser = await prisma.userAccount.create({
        data: {
            email: "archive.sync@example.com",
            password: "password123",
        },
    });

    const collaboratorUser = await prisma.userAccount.create({
        data: {
            email: "collab.sync@example.com",
            password: "password123",
        },
    });

    const reflectionSeeds = [
        {
            id: reflectionId,
            userId: primaryUser.id,
            title: "before sync",
            content: ["first draft", "needs cleanup"],
            date: new Date("2026-08-01T09:00:00.000Z"),
            drawingPaths: [{ path: "M0 0L4 4", color: "#111111" }],
            createdAt: new Date("2026-08-01T09:00:00.000Z"),
            lastSyncedAt: new Date("2026-08-01T09:00:00.000Z"),
            lastEditedAt: new Date("2026-08-01T09:00:00.000Z"),
            updatedAt: new Date("2026-08-01T09:00:00.000Z"),
        },
        {
            id: "22222222-2222-2222-2222-222222222222",
            userId: primaryUser.id,
            title: "morning walk",
            content: ["trail conditions", "clear sky"],
            date: new Date("2026-08-02T09:00:00.000Z"),
            drawingPaths: [{ path: "M0 1L5 6", color: "#222222" }],
            createdAt: new Date("2026-08-02T09:00:00.000Z"),
            lastSyncedAt: new Date("2026-08-02T09:00:00.000Z"),
            lastEditedAt: new Date("2026-08-02T09:00:00.000Z"),
            updatedAt: new Date("2026-08-02T09:00:00.000Z"),
        },
        {
            id: "33333333-3333-3333-3333-333333333333",
            userId: primaryUser.id,
            title: "evening notes",
            content: ["light fading", "pack early"],
            date: new Date("2026-08-03T09:00:00.000Z"),
            drawingPaths: [{ path: "M1 0L6 5", color: "#333333" }],
            createdAt: new Date("2026-08-03T09:00:00.000Z"),
            lastSyncedAt: new Date("2026-08-03T09:00:00.000Z"),
            lastEditedAt: new Date("2026-08-03T09:00:00.000Z"),
            updatedAt: new Date("2026-08-03T09:00:00.000Z"),
        },
        {
            id: "44444444-4444-4444-4444-444444444444",
            userId: archiveUser.id,
            title: "archive one",
            content: ["older context"],
            date: new Date("2026-08-04T09:00:00.000Z"),
            drawingPaths: [{ path: "M2 2L8 8", color: "#444444" }],
            createdAt: new Date("2026-08-04T09:00:00.000Z"),
            lastSyncedAt: new Date("2026-08-04T09:00:00.000Z"),
            lastEditedAt: new Date("2026-08-04T09:00:00.000Z"),
            updatedAt: new Date("2026-08-04T09:00:00.000Z"),
        },
        {
            id: "55555555-5555-5555-5555-555555555555",
            userId: archiveUser.id,
            title: "archive two",
            content: ["reference note", "saved for later"],
            date: new Date("2026-08-05T09:00:00.000Z"),
            drawingPaths: [{ path: "M3 3L9 9", color: "#555555" }],
            createdAt: new Date("2026-08-05T09:00:00.000Z"),
            lastSyncedAt: new Date("2026-08-05T09:00:00.000Z"),
            lastEditedAt: new Date("2026-08-05T09:00:00.000Z"),
            updatedAt: new Date("2026-08-05T09:00:00.000Z"),
        },
        {
            id: "66666666-6666-6666-6666-666666666666",
            userId: collaboratorUser.id,
            title: "shared path",
            content: ["collaboration context"],
            date: new Date("2026-08-06T09:00:00.000Z"),
            drawingPaths: [{ path: "M4 4L10 10", color: "#666666" }],
            createdAt: new Date("2026-08-06T09:00:00.000Z"),
            lastSyncedAt: new Date("2026-08-06T09:00:00.000Z"),
            lastEditedAt: new Date("2026-08-06T09:00:00.000Z"),
            updatedAt: new Date("2026-08-06T09:00:00.000Z"),
        },
    ];

    await prisma.reflection.createMany({
        data: reflectionSeeds,
    });

    return { user: primaryUser, reflections: reflectionSeeds }
}