import { Module } from '@nestjs/common';
import { ReflectionsController } from './reflections.controller';
import { ReflectionsService } from './reflections.service';
import { DatabaseModule } from '../database/database.module';
import { ReflectionsRepository } from './reflections.repository';
import { SyncService } from './sync.service';
import {IntelligenceService} from "./intelligence.service";
import {IntelligenceRepository} from "./intelligence.repository";

@Module({
  imports: [DatabaseModule],
  controllers: [ReflectionsController],
  providers: [ReflectionsService, ReflectionsRepository, SyncService, IntelligenceService, IntelligenceRepository],
  exports: [ReflectionsService, SyncService, IntelligenceService],
})
export class ReflectionsModule {}
