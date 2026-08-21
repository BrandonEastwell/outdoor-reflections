import {Injectable} from "@nestjs/common";
import {IntelligenceRepository} from "./intelligence.repository";

@Injectable()
export class IntelligenceService {
    constructor(private repo: IntelligenceRepository) {}


}