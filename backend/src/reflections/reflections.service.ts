import {Injectable} from "@nestjs/common";
import {ReflectionsRepository} from "./reflections.repository";
import {ReflectionEntryDTO} from "../interfaces/reflection.types";


@Injectable()
export class ReflectionsService {
    constructor(private repo: ReflectionsRepository) {}

    createEntry(reflectionEntry: ReflectionEntryDTO, userID: number) {
        return this.repo.create(reflectionEntry, userID)
    }
}