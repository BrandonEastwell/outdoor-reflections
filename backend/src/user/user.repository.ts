import {Injectable} from "@nestjs/common";
import {PrismaService} from "../database/prisma.service";
import {User} from "../interfaces/user.types";

@Injectable()
export class UserRepository {
    constructor(private db: PrismaService) {}

    async getUserById(id: number) {
        return (await this.db.query('SELECT * FROM user_account WHERE id = $1', [id])).rows[0];
    }

    async getUserByUsername(username: string) {
        return (await this.db.query('SELECT * FROM user_account WHERE username = $1', [username])).rows[0];
    }

    async createUser(username: string, password: string) {
        const query = "INSERT INTO user_account (username, password) VALUES ($1, $2) RETURNING *"
        const res = await this.db.query(query, [username, password])
        return res.rows[0]
    }

    async deleteUser(id: number) {
        const query = "DELETE FROM user_account WHERE id=$1 RETURNING *"
        const res = await this.db.query(query, [id])
        return res.rows[0]
    }

    async updateUser(id: number, userData: Partial<User>) {
        let query = "UPDATE user_account SET"
        let values: any[] = []

        let count = 1;
        for (const field in userData) {
            if (count !== 1) query += ', '
            query += `${field}=$${count}`
            values.push(userData[field])
            count++
        }

        query += " WHERE id=$3 RETURNING *"
        values.push(id)
        const res = await this.db.query(query, values)
        return res.rows[0]
    }
}