import {Injectable} from "@nestjs/common";
import {ReflectionsRepository} from "./reflections.repository";
import {Reflection, ReflectionEntryDTO} from "../interfaces/reflection.types";

@Injectable()
export class SyncService {
    constructor(private repo: ReflectionsRepository) {}

    async syncEntries(entries: ReflectionEntryDTO[], userId: number) {
        const entriesToInsert: Reflection[] = entries.map(entry => ({...entry, user_id: userId }))
        return this.repo.upsert(entriesToInsert)
    }
}
