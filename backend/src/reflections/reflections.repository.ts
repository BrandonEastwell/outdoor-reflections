import {Injectable} from "@nestjs/common";
import {DatabaseService} from "../database/database.service";
import {Reflection, ReflectionEntryDTO} from "../interfaces/reflection.types";

@Injectable()
export class ReflectionsRepository {
    constructor(private readonly db: DatabaseService) {}

    async create(reflectionDTO: ReflectionEntryDTO, userID: number) {
        const query = "INSERT INTO reflection (id, user_id, title, content, drawing_paths) VALUES ($1, $2, $3, $4, $5) RETURNING *"
        const res = await this.db.query(query,
            [userID, reflectionDTO.title, reflectionDTO.content, reflectionDTO.drawings])
        return res.rows[0]
    }

    async delete(id: number) {
        const query = "DELETE FROM reflection WHERE id=$1 RETURNING *"
        const res = await this.db.query(query, [id])
        return res.rows[0]
    }
}