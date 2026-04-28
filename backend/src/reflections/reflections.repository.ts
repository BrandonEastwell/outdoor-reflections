import {Injectable} from "@nestjs/common";
import {ReflectionsDTO} from "./reflections.controller";

@Injectable()
export class ReflectionsRepository {
    constructor() {}

    async create(reflectionEntry: ReflectionsDTO) {
        return reflectionEntry
    }
}