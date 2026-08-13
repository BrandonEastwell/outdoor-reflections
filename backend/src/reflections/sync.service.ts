import {Injectable} from "@nestjs/common";
import {ReflectionsRepository} from "./reflections.repository";
import {ReflectionResponseDto} from "../interfaces/reflection.types";
import {SafeUser} from "../interfaces/user.types";

@Injectable()
export class SyncService {
    constructor(private repo: ReflectionsRepository) {}

    async syncEntries(entries: ReflectionResponseDto[], user: SafeUser) {
        return this.repo.upsert(entries, user.id)
    }
}
