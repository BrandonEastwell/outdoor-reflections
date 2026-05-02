import {DatabaseService} from "../database/database.service";
import {Test} from "@nestjs/testing";
import {ReflectionsRepository} from "./reflections.repository";

describe('ReflectionsRepository', () => {
    let reflectionRepository: ReflectionsRepository;

    beforeEach(async () => {
        const app = await Test.createTestingModule({
            imports: [DatabaseService],
            providers: [ReflectionsRepository]
        }).compile()

        reflectionRepository = app.get(ReflectionsRepository)
    })

    it('should create a new reflections entry in reflections table', () => {
        
    });
});