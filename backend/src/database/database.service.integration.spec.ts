import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let prisma: PrismaService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [PrismaService],
    }).compile();

    prisma = app.get(PrismaService);
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should connect to a DB service', async () => {
    const users = await prisma.userAccount.findMany();
    expect(Array.isArray(users)).toBe(true);
  });
});
