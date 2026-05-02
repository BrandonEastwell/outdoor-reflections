import {Controller, Get, Param, Post, Req, Res} from "@nestjs/common";
import {ReflectionsService} from "./reflections.service";
import {ReflectionDTO} from "../interfaces/reflection.types";
import type {Request, Response} from 'express';

@Controller('reflection')
export class ReflectionsController {
    constructor(private reflectionService: ReflectionsService) {}

    @Post()
    async create(@Req() req: Request, @Res() res: Response) {
        const { title, drawing, content, userID } = req.body;
        const dto: ReflectionDTO = { title, drawing, content }
        return this.reflectionService.createEntry(dto, userID)
    }

    @Get(':id')
    findOne(@Param('id') id: string): string {
        console.log(id)
        return "Returns a reflection"
    }
}