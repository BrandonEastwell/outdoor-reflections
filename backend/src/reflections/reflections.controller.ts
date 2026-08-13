import {Controller, Get, Param, Post, Req, Res, UseGuards} from "@nestjs/common";
import {ReflectionsService} from "./reflections.service";
import type {Request, Response} from 'express';
import {SyncService} from "./sync.service";
import {JwtAuthGuard} from "../auth/jwt-auth-guard";
import {ReflectionResponseDto} from "../interfaces/reflection.types";
import {SafeUser} from "../interfaces/user.types";

@Controller('reflection')
export class ReflectionsController {
    constructor(private reflectionService: ReflectionsService, private syncService: SyncService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Req() req: Request, @Res() res: Response) {
        const { userId, entry }: { userId: number, entry: ReflectionResponseDto } = req.body;
        return this.reflectionService.createEntry(entry, userId)
    }

    @Get(':id')
    findOne(@Param('id') id: string): string {
        console.log(id)
        return "Returns a reflection"
    }

    @UseGuards(JwtAuthGuard)
    @Post('sync')
    async sync(@Req() req: Request, @Res() res: Response) {
        const { user, entries }: { user: SafeUser, entries: ReflectionResponseDto[] } = req.body;
        return this.syncService.syncEntries(entries, user)
    }
}
