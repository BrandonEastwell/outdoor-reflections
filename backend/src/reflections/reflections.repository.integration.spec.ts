import {DatabaseService} from "../database/database.service";
import {Test} from "@nestjs/testing";
import {ReflectionsRepository} from "./reflections.repository";
import {ReflectionDTO} from "../interfaces/reflection.types";
import {DatabaseModule} from "../database/database.module";

describe('ReflectionsRepository', () => {
    let reflectionRepository: ReflectionsRepository;
    let db: DatabaseService;

    beforeEach(async () => {
        const app = await Test.createTestingModule({
            imports: [DatabaseModule],
            providers: [ReflectionsRepository]
        }).compile()

        reflectionRepository = app.get(ReflectionsRepository)
        db = app.get(DatabaseService)
    })

    it('should create a new reflections entry in reflections table', async () => {
        const entry: ReflectionDTO = {
            title: "test entry",
            content: "it is day 3",
            drawing: null
        }

        const query = "SELECT COUNT(*) FROM reflection"
        const before = await db.query(query)
        await reflectionRepository.create(entry);
        const after = await db.query(query)
        expect(Number(after.rows[0].count)).toBe(Number(before.rows[0].count) + 1)
    });
});