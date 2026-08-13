import {Injectable, Logger} from "@nestjs/common";
import {ReflectionsRepository} from "./reflections.repository";
import {ReflectionResponseDto} from "./reflection.types";
import {SafeUser} from "../user/user.types";

@Injectable()
export class SyncService {
    constructor(private repo: ReflectionsRepository) {}
    private readonly logger = new Logger(SyncService.name)

    async syncEntries(entries: ReflectionResponseDto[], user: SafeUser) {
        if (entries.length === 0) return [];

        this.logger.log(`Syncing ${entries.length} entries`)
        const start = process.hrtime()
        const results = await this.repo.upsertMany(entries, user.id)
        const diff = process.hrtime(start)
        this.logger.log(`${results.entriesSynced.length} entries synced`)
        results.entriesCreated && this.logger.log(`${results.entriesCreated.length} entries created`)

    }
}
