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

    it('should connect to a DB service', async () => {
        const res = await prisma.userAccount.findMany()
        expect(res.length).toBe(1)
    });
});