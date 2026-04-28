import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ReflectionsController} from "./reflections/reflections.controller";
import {ReflectionsService} from "./reflections/reflections.service";

@Module({
  imports: [],
  controllers: [AppController, ReflectionsController],
  providers: [AppService, ReflectionsService],
})
export class AppModule {}
