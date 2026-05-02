import {Injectable} from "@nestjs/common";
import {DatabaseService} from "../database/database.service";
import {Reflection, ReflectionDTO} from "../interfaces/reflection.types";
import {QueryResult} from "pg";

@Injectable()
export class ReflectionsRepository {
    constructor(private readonly db: DatabaseService) {}

    async create(reflectionEntry: ReflectionDTO): QueryResult {
        const query = "INSERT INTO reflection (user_id, title, content, drawing)"
        return reflectionEntry
    }
}