import {Injectable} from "@nestjs/common";
import {ReflectionsRepository} from "./reflections.repository";
import {ReflectionsDTO} from "./reflections.controller";


@Injectable()
export class ReflectionsService {
    constructor(private repo: ReflectionsRepository) {}

    createEntry(reflectionEntry: ReflectionsDTO) {
        return this.repo.create(reflectionEntry)
    }
}