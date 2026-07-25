import {Injectable} from "@nestjs/common";
import {ReflectionsRepository} from "./reflections.repository";
import {Entry, EntryDTO} from "../interfaces/reflection.types";


@Injectable()
export class ReflectionsService {
    constructor(private repo: ReflectionsRepository) {}

    createEntry(reflectionEntry: EntryDTO, userId: number) {
        const reflectionToCreate: Entry = { ...reflectionEntry, user_id: userId }
        return this.repo.create(reflectionToCreate)
    }
}