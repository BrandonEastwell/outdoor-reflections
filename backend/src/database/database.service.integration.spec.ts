import {PrismaService} from "./prisma.service.js";
import {ConfigModule} from "@nestjs/config";
import {Test} from "@nestjs/testing";

describe('PrismaService', () => {
    let prisma: PrismaService

    beforeEach(async () => {
        const app = await Test.createTestingModule({
            imports: [ConfigModule.forRoot()],
            providers: [PrismaService],
        }).compile()

        prisma = app.get(PrismaService)
    })

    beforeAll(async () => {
        await prisma.$connect();
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it('should connect to a DB service', async () => {
        const users = await prisma.userAccount.findMany()
        expect(Array.isArray(users)).toBe(true);
    });
});