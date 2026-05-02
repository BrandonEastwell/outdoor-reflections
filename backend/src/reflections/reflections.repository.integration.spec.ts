import {DatabaseService} from "../database/database.service";
import {Test} from "@nestjs/testing";
import {ReflectionsRepository} from "./reflections.repository";
import {ReflectionDTO} from "../interfaces/reflection.types";
import {DatabaseModule} from "../database/database.module";

describe('ReflectionsRepository', () => {
    let reflectionRepository: ReflectionsRepository;
    let db: DatabaseService;

    let testUserName = "test_user"
    let testUserID: number;

    beforeEach(async () => {
        const app = await Test.createTestingModule({
            imports: [DatabaseModule],
            providers: [ReflectionsRepository]
        }).compile()

        reflectionRepository = app.get(ReflectionsRepository)
        db = app.get(DatabaseService)

        const query = "INSERT INTO user_account (username, password) Values ($1, $2) ON CONFLICT (username) DO UPDATE SET username = EXCLUDED.username RETURNING id"
        const res = await db.query(query, [testUserName, 'test']);
        testUserID = res.rows[0].id;
    })

    afterAll(async () => {
        const query = "DELETE FROM user_account WHERE username = $1"
        await db.query(query, [testUserName]);
    })

    it('should create a new reflections entry in reflections table', async () => {
        const entry: ReflectionDTO = {
            title: "test entry",
            content: "it is day 3",
            drawing: null
        }

        const query = "SELECT COUNT(*) FROM reflection"
        const before = await db.query(query)
        await reflectionRepository.create(entry, testUserID);
        const after = await db.query(query)
        expect(Number(after.rows[0].count)).toBe(Number(before.rows[0].count) + 1)
    });

    it('should delete a reflections entry from reflections table', async () => {
        const insertEntryQuery = "INSERT INTO reflection (user_id, title) Values ($1, $2) RETURNING *";
        const res = await db.query(insertEntryQuery, [testUserID, 'test']);

        await reflectionRepository.delete(res.rows[0].id)
        const countRes = await db.query("SELECT COUNT(*) FROM reflection WHERE id = $1",
            [res.rows[0].id]);

        expect(Number(countRes.rows[0].count)).toBe(0)
    });

});