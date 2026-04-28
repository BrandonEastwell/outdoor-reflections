import {Injectable, OnModuleDestroy, OnModuleInit} from "@nestjs/common";
import {Pool, QueryResult, QueryResultRow} from "pg";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class DatabaseService implements OnModuleDestroy, OnModuleInit {
    private pool: Pool;

    constructor(private readonly configService: ConfigService) {
        const connectionString = this.configService.get<string>('DATABASE_URL');

        if (!connectionString) {
            throw new Error('DATABASE_URL is missing');
        }

        this.pool = new Pool({
            connectionString,
        });
    }

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