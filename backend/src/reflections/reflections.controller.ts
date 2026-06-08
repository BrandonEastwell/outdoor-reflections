import {Controller, Get, Param, Post, Req, Res} from "@nestjs/common";
import {ReflectionsService} from "./reflections.service";
import {ReflectionEntryDTO} from "../interfaces/reflection.types";
import type {Request, Response} from 'express';
import {SyncService} from "./sync.service";

@Controller('reflection')
export class ReflectionsController {
    constructor(private reflectionService: ReflectionsService, private syncService: SyncService) {}

    @Post()
    async create(@Req() req: Request, @Res() res: Response) {
        const { userId, entry }: { userId: number, entry: ReflectionEntryDTO } = req.body;
        return this.reflectionService.createEntry(entry, userId)
    }

    @Get(':id')
    findOne(@Param('id') id: string): string {
        console.log(id)
        return "Returns a reflection"
    }

    @Post('sync')
    async syncReflections(@Req() req: Request, @Res() res: Response) {
        const { userId, entries }: { userId: number, entries: ReflectionEntryDTO[] } = req.body;
        return this.syncService.syncEntries(entries, userId)
    }
}
