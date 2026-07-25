import {AuthService} from "./auth.service";
import {Controller, Get, Post, Req, Res, UseGuards} from "@nestjs/common";
import type {Request, Response} from 'express';
import {LocalAuthGuard} from "./local-auth-guard";
import {UserDto} from "../interfaces/user.types";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post()
    async login(@Req() req: Request, @Res() res: Response) {
        return await this.authService.login(<UserDto>req.user);
    }

    @Get()
    async me(@Req() req: Request, @Res() res: Response) {

    }
}