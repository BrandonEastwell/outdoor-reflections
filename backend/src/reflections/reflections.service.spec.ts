import {ReflectionsController} from "./reflections.controller";
import {ReflectionsService} from "./reflections.service";
import {Test} from "@nestjs/testing";
import {Reflection} from "../interfaces/reflection.interface";

describe('ReflectionsService', () => {
    let reflectionsController: ReflectionsController
    let reflectionsService: ReflectionsService

    beforeEach(async () => {
        const app = await Test.createTestingModule({
            controllers: [ReflectionsController],
            providers: [ReflectionsService],
        }).compile()

        reflectionsController = app.get(ReflectionsController)
        reflectionsService = app.get(ReflectionsService)
    })

    describe('create', () => {
        const mockReflectionEntry: Reflection = { content: "...", title: "day 1" }

        it('should create a new reflection entry', () => {
            expect(reflectionsService.createEntry(mockReflectionEntry))
        });
    });
});