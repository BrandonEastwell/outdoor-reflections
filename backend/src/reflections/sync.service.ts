import {Injectable} from "@nestjs/common";
import {ReflectionsRepository} from "./reflections.repository";
import {Reflection, ReflectionEntryDTO} from "../interfaces/reflection.types";

@Injectable()
export class SyncService {
    constructor(private repo: ReflectionsRepository) {}

    syncEntries(userId: number, entries: ReflectionEntryDTO[]) {
        const entriesToInsert: Reflection[] = entries.map(entry => ({...entry, user_id: userId }))
        this.repo.upsert()
    }
}