import {Injectable} from "@nestjs/common";
import {DatabaseService} from "../database/database.service";

@Injectable()
export class UserRepository {
    constructor(private db: DatabaseService) {}
}