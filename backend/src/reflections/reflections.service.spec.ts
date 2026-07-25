import {ReflectionsService} from "./reflections.service";
import {Test} from "@nestjs/testing";
import {ReflectionsRepository} from "./reflections.repository";
import {EntryDTO} from "../interfaces/reflection.types";

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
        const mockReflectionEntry: EntryDTO = {
            created_at: new Date(),
            date: new Date(),
            id: "",
            last_synced_at: null,
            sync_status: "pending",
            updated_at: new Date(),
            content: "...",
            title: "day 1",
            drawing_paths: []
        }

        it('should create a new reflection entry', async () => {
            mockReflectionRepo.create.mockResolvedValue({user_id: 0, ...mockReflectionEntry})
            const res = await reflectionsService.createEntry(mockReflectionEntry, 0);
            expect(res).toMatchObject(mockReflectionEntry)
            expect(res).toHaveProperty("id")
        });
    });
});