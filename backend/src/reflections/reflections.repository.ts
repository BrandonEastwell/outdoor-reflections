import {Injectable} from "@nestjs/common";
import {ReflectionDTO} from "./reflections.controller";
import {DatabaseService} from "../database/database.service";

@Injectable()
export class ReflectionsRepository {
    constructor(private readonly db: DatabaseService) {}

    async create(reflectionEntry: ReflectionsDTO) {
        return reflectionEntry
    }
}