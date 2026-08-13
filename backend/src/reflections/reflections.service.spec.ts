import {ReflectionsService} from "./reflections.service";
import {Test} from "@nestjs/testing";
import {ReflectionsRepository} from "./reflections.repository";
import {ReflectionResponseDto} from "./reflection.types";
import {randomUUID} from "node:crypto";

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
        const mockReflectionEntry: ReflectionResponseDto = {
            createdAt: "",
            date: new Date().toISOString(),
            id: randomUUID(),
            lastSyncedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            title: "test entry",
            content: ["it is day 3"],
            drawingPaths: [],
        };

        it('should create a new reflection entry', async () => {
            mockReflectionRepo.create.mockResolvedValue({user_id: 0, ...mockReflectionEntry})
            const res = await reflectionsService.createEntry(mockReflectionEntry, 0);
            expect(res).toMatchObject(mockReflectionEntry)
            expect(res).toHaveProperty("id")
        });
    });
});