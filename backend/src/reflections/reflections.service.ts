import {Injectable} from "@nestjs/common";
import {Reflection} from "../interfaces/reflection.interface";
import {ReflectionsRepository} from "./reflections.repository";


@Injectable()
export class ReflectionsService {
    constructor(private repo: ReflectionsRepository) {}

    createEntry(reflectionEntry: Reflection) {

    }
}