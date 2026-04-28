import {ReflectionsController} from "./reflections.controller";
import {ReflectionsService} from "./reflections.service";
import {Test} from "@nestjs/testing";
import {Reflection} from "../interfaces/reflection.interface";
import {ReflectionsRepository} from "./reflections.repository";

describe('ReflectionsService', () => {
    let reflectionsController: ReflectionsController
    let reflectionsService: ReflectionsService

    const mockReflectionRepo = {
        findByTitle: jest.fn(),
        create: jest.fn(),
    };

    beforeEach(async () => {
        const app = await Test.createTestingModule({
            controllers: [ReflectionsController],
            providers: [ReflectionsService,
                {
                    provide: ReflectionsRepository,
                    useValue: mockReflectionRepo
                }],
        }).compile()

        reflectionsController = app.get(ReflectionsController)
        reflectionsService = app.get(ReflectionsService)
    })

    describe('create', () => {
        const mockReflectionEntry: Reflection = { content: "...", title: "day 1" }

        it('should create a new reflection entry', () => {
            const res = reflectionsService.createEntry(mockReflectionEntry);
            expect(res).toMatchObject(mockReflectionEntry)
            expect(res).toHaveProperty("id")
        });
    });
});