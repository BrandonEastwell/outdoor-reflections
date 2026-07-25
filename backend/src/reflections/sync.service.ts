import {Injectable} from "@nestjs/common";
import {ReflectionsRepository} from "./reflections.repository";
import {Entry, EntryDTO} from "../interfaces/reflection.types";

@Injectable()
export class SyncService {
    constructor(private repo: ReflectionsRepository) {}

    async syncEntries(entries: EntryDTO[], userId: number) {
        const entriesToInsert: Entry[] = entries.map(entry => ({...entry, user_id: userId }))
        return this.repo.upsert(entriesToInsert)
    }
}
