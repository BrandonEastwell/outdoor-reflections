import {Injectable} from "@nestjs/common";
import {ReflectionsRepository} from "./reflections.repository";
import {ReflectionDTO} from "../interfaces/reflection.types";


@Injectable()
export class ReflectionsService {
    constructor(private repo: ReflectionsRepository) {}

    createEntry(reflectionEntry: ReflectionDTO, userID: number) {
        return this.repo.create(reflectionEntry, userID)
    }
}