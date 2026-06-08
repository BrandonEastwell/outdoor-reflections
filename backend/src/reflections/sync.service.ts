import {Injectable} from "@nestjs/common";
import {ReflectionsRepository} from "./reflections.repository";
import {ReflectionEntryDTO} from "../interfaces/reflection.types";

@Injectable()
export class SyncService {
    constructor(private repo: ReflectionsRepository) {}

    syncEntries(userId: number, entries: ReflectionEntryDTO[]) {
        
    }
}