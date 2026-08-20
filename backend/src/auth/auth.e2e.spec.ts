import {ExecutionContext, INestApplication} from "@nestjs/common";
import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../app.module";
import {ConfigModule} from "@nestjs/config";
import request from "supertest";
import {GoogleAuthGuard} from "./google-auth-guard";
import {PrismaService} from "../database/prisma.service";


describe('Auth flow end to end tests', () => {
    let app: INestApplication;
    let prisma: PrismaService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule,
                ConfigModule.forRoot({
                    isGlobal: true,
                    envFilePath: ".env.test",
                }),
            ]
        }).overrideGuard(GoogleAuthGuard)
            .useValue({
                canActivate(context: ExecutionContext) {
                    const request = context.switchToHttp().getRequest();
                    request.user = {
                        provider: 'google',
                        providerId: 'google-123',
                        email: 'test@example.com',
                        firstName: 'Test',
                        lastName: 'User',
                    };
                    return true;
                },
            }).compile()

        app = module.createNestApplication();
        await app.init();

        prisma = module.get(PrismaService);
    })

    beforeEach(async () => {
        await prisma.refreshToken.deleteMany();
        await prisma.userAccount.deleteMany();
    })

    afterAll(async () => {
        await app.close();
    })

    it('GET auth/google/callback returns login tokens', async () => {
        const response = await request(app.getHttpServer())
            .get('/auth/google/callback')
            .expect(200)

        expect(response.body.access_token).toBeDefined();
        expect(response.body.refresh_token).toBeDefined();
    })

    it('GET auth/google/callback called twice returns a 409 conflict', async () => {
        await request(app.getHttpServer())
            .get('/auth/google/callback')
            .expect(200)

        const res = await request(app.getHttpServer())
            .get('/auth/google/callback')
            .expect(409)

        expect(res.body.message).toBe('User already signed in on this device');
    })
})