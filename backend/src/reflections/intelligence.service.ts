import {Injectable, Req, Res} from "@nestjs/common";
import {IntelligenceRepository} from "./intelligence.repository";

@Injectable()
export class IntelligenceService {
    constructor(private repo: IntelligenceRepository) {}

    async getSentenceStarter(@Req() req: Request, @Res() res: Response) {
    }
}