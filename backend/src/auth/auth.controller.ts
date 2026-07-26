import {AuthService} from "./auth.service";
import {Body, Controller, Get, Post, Req, UseGuards} from "@nestjs/common";
import type {Request} from 'express';
import {LocalAuthGuard} from "./local-auth-guard";
import {JwtAuthGuard} from "./jwt-auth-guard";
import {CredentialsDto} from "./auth.dto";
import {SafeUser} from "../interfaces/user.types";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req: Request) {
        return await this.authService.createToken(req.user as SafeUser);
    }

    @Post('register')
    async register(@Body() credentials: CredentialsDto) {
        return await this.authService.register(credentials)
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async me(@Req() req: Request) {
        return req.user
    }
}