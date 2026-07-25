import {PrismaService} from "./prisma.service";
import {Test} from "@nestjs/testing";
import {ConfigModule} from "@nestjs/config";

describe('PrismaService', () => {
    let prisma: PrismaService

    beforeEach(async () => {
        const app = await Test.createTestingModule({
            imports: [ConfigModule.forRoot({ isGlobal: true })],
            providers: [PrismaService],
        }).compile()

        prisma = app.get(PrismaService)
    })

    beforeAll(async () => {
        prisma = new PrismaService();
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