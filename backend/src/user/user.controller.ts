import {UserService} from "./user.service";
import {Controller, Get, Post, Req, Res} from "@nestjs/common";
import type { Request, Response } from 'express';

@Controller('users')
export class UserController {
     constructor(private userService: UserService) {}

    @Get(':id')
    findUser(@Req() req: Request, @Res() res: Response) {
         const userID: string = req.params.id[0];
    }

    @Post()
    createUser(@Req() req: Request, @Res() res: Response) {
         const body = req.body;

    }
 }