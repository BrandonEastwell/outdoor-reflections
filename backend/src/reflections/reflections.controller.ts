import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {ReflectionsService} from "./reflections.service";
import {ReflectionDTO} from "../interfaces/reflection.types";

@Controller('reflection')
export class ReflectionsController {
    constructor(private reflectionService: ReflectionsService) {}

    @Post()
    async create(@Body() body: ReflectionDTO ) {
        return this.reflectionService.createEntry(body)
    }

    @Get(':id')
    findOne(@Param('id') id: string): string {
        console.log(id)
        return "Returns a reflection"
    }
}