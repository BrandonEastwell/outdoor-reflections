import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ReflectionsController} from "./reflections/reflections.controller";
import {ReflectionsService} from "./reflections/reflections.service";
import {ReflectionsModule} from "./reflections/reflections.module";

@Module({
  imports: [ReflectionsModule],
  controllers: [AppController, ReflectionsController],
  providers: [AppService, ReflectionsService],
})
export class AppModule {}
