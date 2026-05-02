import {UserService} from "./user.service";
import {Controller, Get, Post, Req, Res} from "@nestjs/common";
import type { Request, Response } from 'express';
import {UserDTO} from "../interfaces/user.types";

@Controller('users')
export class UserController {
     constructor(private userService: UserService) {}

    @Get(':id')
    findOne(@Req() req: Request, @Res() res: Response) {
         const userID: string = req.params.id[0];
         this.userService.findUserByID(Number(userID))
    }

    @Post()
    create(@Req() req: Request, @Res() res: Response) {
         const UserDTO: UserDTO = req.body;
         this.userService.createUser(UserDTO)
    }
 }