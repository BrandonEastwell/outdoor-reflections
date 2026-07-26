import {AuthService} from "./auth.service";
import {Body, Controller, Get, Post, Req, Res, UseGuards} from "@nestjs/common";
import type {Request} from 'express';
import {LocalAuthGuard} from "./local-auth-guard";
import {JwtAuthGuard} from "./jwt-auth-guard";
import {CredentialsDto} from "./auth.dto";
import {SafeUser} from "../interfaces/user.types";
import request from "supertest";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req: Request) {
        return await this.authService.login(req.user as SafeUser);
    }

    @Post('register')
    async register(@Body() credentials: CredentialsDto) {
        return await this.authService.register(credentials)
    }

    @UseGuards(LocalAuthGuard)
    @Post('logout')
    async logout(@Req() req: Request, @Res() res: Request) {
        res.cookies.clear('access_token');
        return res
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async me(@Req() req: Request) {
        return req.user
    }
}