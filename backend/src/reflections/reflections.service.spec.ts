import {ReflectionDTO} from "./reflections.controller";
import {ReflectionsService} from "./reflections.service";
import {Test} from "@nestjs/testing";
import {ReflectionsRepository} from "./reflections.repository";

describe('ReflectionsService', () => {
    let reflectionsService: ReflectionsService

    const mockReflectionRepo = {
        findByTitle: jest.fn(),
        create: jest.fn(),
    };

    beforeEach(async () => {
        const app = await Test.createTestingModule({
            providers: [ReflectionsService,
                {
                    provide: ReflectionsRepository,
                    useValue: mockReflectionRepo
                }],
        }).compile()

        reflectionsService = app.get(ReflectionsService)
    })

    describe('create', () => {
        const mockReflectionEntry: ReflectionsDTO = { content: "...", title: "day 1" }

        it('should create a new reflection entry', async () => {
            mockReflectionRepo.create.mockResolvedValue({id: 0, ...mockReflectionEntry})
            const res = await reflectionsService.createEntry(mockReflectionEntry);
            expect(res).toMatchObject(mockReflectionEntry)
            expect(res).toHaveProperty("id")
        });
    });
});