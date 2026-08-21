import { Module } from '@nestjs/common';
import {IntelligenceController} from "./intelligence.controller";
import {DatabaseModule} from "../../database/database.module";
import {IntelligenceService} from "./intelligence.service";
import {IntelligenceRepository} from "./intelligence.repository";

@Module({
    imports: [DatabaseModule],
    controllers: [IntelligenceController],
    providers: [IntelligenceService, IntelligenceRepository],
    exports: [IntelligenceService],
})
export class IntelligenceModule {}
