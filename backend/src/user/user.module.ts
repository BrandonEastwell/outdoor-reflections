import {Module} from "@nestjs/common";
import {DatabaseModule} from "../database/database.module";
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {UserRepository} from "./user.repository";
import {AuthService} from "./auth.service";

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [UserService, UserRepository, AuthService],
    exports: [UserService]
})

export class UserModule {}