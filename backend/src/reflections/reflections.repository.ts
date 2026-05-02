import {Injectable} from "@nestjs/common";
import {DatabaseService} from "../database/database.service";
import {ReflectionDTO} from "../interfaces/reflection.types";

@Injectable()
export class ReflectionsRepository {
    constructor(private readonly db: DatabaseService) {}

    async create(reflectionDTO: ReflectionDTO, userID: number) {
        const query = "INSERT INTO reflection (user_id, title, content, drawing) VALUES ($1, $2, $3, $4) RETURNING *"
        const res = await this.db.query(query,
            [userID, reflectionDTO.title, reflectionDTO.content, reflectionDTO.drawing])
        return res.rows[0]
    }

    async delete(id: number) {
        const query = "DELETE FROM reflection WHERE id=$1 RETURNING *"
        const res = await this.db.query(query, [id])
        return res.rows[0]
    }
}