import {OnModuleDestroy, OnModuleInit} from "@nestjs/common";
import {Pool, QueryResult, QueryResultRow} from "pg";
import * as process from "node:process";

export class DatabaseService implements OnModuleDestroy, OnModuleInit {
    private pool = new Pool({
        connectionString: process.env.DATABASE_URL,
    });

    async query<T extends QueryResultRow = any>(text: string, params?: unknown[]): Promise<QueryResult<T>> {
        return this.pool.query<T>(text, params);
    }

    async onModuleDestroy() {
        await this.pool.end();
    }

    async onModuleInit() {
        try {
            await this.query("SELECT 1")
            console.log("✅ Database connected");
        } catch (e) {
            console.error("❌ Database connection failed", e);
        }

    }


}