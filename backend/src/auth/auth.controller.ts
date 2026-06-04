import {AuthService} from "./auth.service";
import {Controller, Post, Req, Res, UseGuards} from "@nestjs/common";
import type {Request, Response} from 'express';
import {LocalAuthGuard} from "./local-auth-guard";
import {User} from "../interfaces/user.types";

@Controller('tokens')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post()
    async login(@Req() req: Request, @Res() res: Response) {
        try {
            return await this.authService.createToken(<User>req.user);
        } catch (err) {
            return res.status(401).json({error: err.message});
        }
    }
}