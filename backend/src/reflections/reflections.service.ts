import {Injectable} from "@nestjs/common";
import {ReflectionsRepository} from "./reflections.repository";
import {Reflection, ReflectionEntryDTO} from "../interfaces/reflection.types";


@Injectable()
export class ReflectionsService {
    constructor(private repo: ReflectionsRepository) {}

    createEntry(reflectionEntry: ReflectionEntryDTO, userId: number) {
        const reflectionToCreate: Reflection = { ...reflectionEntry, user_id: userId }
        return this.repo.create(reflectionToCreate)
    }
}