import {PrismaService} from "../database/prisma.service";
import {Test} from "@nestjs/testing";
import {ReflectionsRepository} from "./reflections.repository";
import {Entry, EntryDTO} from "../interfaces/reflection.types";
import {DatabaseModule} from "../database/database.module";
import {randomUUID} from "node:crypto";

describe('ReflectionsRepository', () => {
    let reflectionRepository: ReflectionsRepository;
    let prisma: PrismaService;

    let testData = { email: 'test@gmail.com', password: "test"}
    let testUserID: number;

    beforeAll(async () => {
        prisma = new PrismaService();
        await prisma.$connect();
    });

    beforeEach(async () => {
        const app = await Test.createTestingModule({
            imports: [DatabaseModule],
            providers: [ReflectionsRepository]
        }).compile()

        reflectionRepository = app.get(ReflectionsRepository)
        prisma = app.get(PrismaService)

        const res = await prisma.userAccount.upsert({
            create: testData,
            update: testData,
            where: { email: testData.email }
        })

        testUserID = res.id;
    })

    afterAll(async () => {
        prisma.userAccount.delete({
            where: { id: testUserID }
        })
        await prisma.$disconnect();
    })

    it('should create a new reflections entry in reflections table', async () => {
        const entry: Entry = {
            created_at: "",
            date: new Date().toISOString(),
            id: "",
            last_synced_at: new Date().toISOString(),
            sync_status: "pending",
            updated_at: new Date().toISOString(),
            title: "test entry",
            content: ["it is day 3"],
            drawing_paths: []
        }

        const before = await prisma.reflection.count()
        await reflectionRepository.create(entry, testUserID);
        const after = await prisma.reflection.count()
        expect(after).toBe(before + 1)
    });

    it('should delete a reflections entry from reflections table', async () => {
        const entry = await prisma.reflection.create({
            data: {
                id: randomUUID(),
                userId: testUserID,
                title: 'test'
            }
        })

        await reflectionRepository.delete(entry.id)
        const res = await prisma.reflection.findFirst({
            where: { id: entry.id }
        })
        expect(res).toBe(null)
    });

});