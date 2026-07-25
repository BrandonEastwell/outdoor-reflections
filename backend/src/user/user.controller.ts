import {UserService} from "./user.service";
import {Controller, Get, Post, Req, Res} from "@nestjs/common";
import type { Request, Response } from 'express';
import {UserDto} from "../interfaces/user.types";
import {AuthService} from "../auth/auth.service";

@Controller('users')
export class UserController {
     constructor(private userService: UserService, private authService: AuthService) {}

    @Get(':id')
    findOne(@Req() req: Request, @Res() res: Response) {
         const userId = Number(req.params.id);
         return this.userService.findUserByID(userId)
    }

    @Post()
    create(@Req() req: Request, @Res() res: Response) {
         const userDTO: UserDto = req.body;
         return this.authService.registerUser(userDTO)
    }
 }
