import {Module} from "@nestjs/common";
import {ReflectionsController} from "./reflections.controller";
import {ReflectionsService} from "./reflections.service";
import {DatabaseModule} from "../database/database.module";
import {ReflectionsRepository} from "./reflections.repository";

@Module({
    imports: [DatabaseModule],
    controllers: [ReflectionsController],
    providers: [ReflectionsService, ReflectionsRepository]
})

export class ReflectionsModule {}