import {Injectable} from "@nestjs/common";
import {Reflection} from "./interfaces/reflection.interface";


@Injectable()
export class ReflectionsService {
    private readonly reflections: Reflection[] = [];

    create(reflectionEntry: Reflection) {
        this.reflections.push(reflectionEntry)
    }
}