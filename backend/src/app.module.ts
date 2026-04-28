import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ReflectionsController} from "./reflections/reflections.controller";
import {ReflectionsService} from "./reflections/reflections.service";
import {ReflectionsModule} from "./reflections/reflections.module";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [ReflectionsModule, ConfigModule.forRoot({isGlobal: true})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
