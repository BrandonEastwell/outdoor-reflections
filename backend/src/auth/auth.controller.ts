import {AuthService} from "./auth.service";
import {Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards} from "@nestjs/common";
import type { Request, Response } from "express";
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
        return await this.authService.login(req.user as SafeUser);
    }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() credentials: CredentialsDto) {
        await this.authService.register(credentials)
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logout(@Res() res: Response) {
        res.clearCookie("access_token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
        });

        return res.status(200).json({ message: "Logged out" });
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async me(@Req() req: Request) {
        return req.user
    }
}