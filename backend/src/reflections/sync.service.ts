import {Injectable} from "@nestjs/common";
import {ReflectionsRepository} from "./reflections.repository";
import {ReflectionResponseDto} from "../interfaces/reflection.types";

@Injectable()
export class SyncService {
    constructor(private repo: ReflectionsRepository) {}

    async syncEntries(entries: ReflectionResponseDto[], userId: number) {
        return this.repo.upsert(entries, userId)
    }
}
