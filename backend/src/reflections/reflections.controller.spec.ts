import {ReflectionsController, ReflectionDTO} from "./reflections.controller";
import {ReflectionsService} from "./reflections.service";
import {Test} from "@nestjs/testing";
import {ConflictException} from "@nestjs/common";
import {ReflectionsRepository} from "./reflections.repository";

describe("ReflectionsController", () => {
    let reflectionsController: ReflectionsController
    let reflectionsService: ReflectionsService

    beforeEach(async () => {
        const app = await Test.createTestingModule({
            controllers: [ReflectionsController],
            providers: [ReflectionsService,
                {
                    provide: ReflectionsRepository,
                    useValue: jest.fn()
                }],
        }).compile()

        reflectionsController = app.get(ReflectionsController)
        reflectionsService = app.get(ReflectionsService)
    })

    describe('create', () => {
        const mockBody: ReflectionsDTO = {
            content: 'hello',
            title: 'day 1'
        }
        const mockServiceReturnValue = { id: 1, ...mockBody }

        it('should create a new reflection entry', async () => {
            jest.spyOn(reflectionsService, 'createEntry').mockResolvedValue(mockServiceReturnValue)
            expect(await reflectionsController.create(mockBody)).toEqual(mockServiceReturnValue)
        });

        it('should return conflict exception if entry exists', () => {
            reflectionsService.createEntry = jest.fn().mockRejectedValue(new ConflictException("Entry already exists"))
            expect(reflectionsController.create(mockBody)).rejects.toThrow(ConflictException)
        });
    })
})