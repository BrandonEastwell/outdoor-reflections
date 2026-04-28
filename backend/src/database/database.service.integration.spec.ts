import {DatabaseService} from "./database.service";
import {Test} from "@nestjs/testing";
import {ConfigModule, ConfigService} from "@nestjs/config";

describe('DatabaseService', () => {
    let db: DatabaseService

    beforeEach(async () => {
        const app = await Test.createTestingModule({
            imports: [ConfigModule.forRoot({ isGlobal: true })],
            providers: [DatabaseService],
        }).compile()

        db = app.get(DatabaseService)
    })

    it('should connect to a DB service', async () => {
        const res = await db.query("SELECT 1")
        expect(res.rows.length).toBe(1)
    });
});