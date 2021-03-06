import {Pool, QueryConfig, QueryResult} from "pg";

export class Database {
    private readonly pool: Pool;

    constructor(user: string, db: string, password: string, host: string, port: number) {
        this.pool = new Pool({
            user: user,
            database: db,
            password: password,
            host: host,
            port: port,
            connectionTimeoutMillis: 10000,
        });
    }

    public prepareTables(): Promise<QueryResult> {
        return this.pool.query({
            text: "CREATE TABLE IF NOT EXISTS st_user (\n" +
                "uuid UUID PRIMARY KEY,\n" +
                "name VARCHAR UNIQUE NOT NULL,\n" +
                "hash VARCHAR NOT NULL\n" +
                ")"
        }).then(() => {
            return this.pool.query({
                text: "CREATE TABLE IF NOT EXISTS st_game (\n" +
                    "uuid UUID PRIMARY KEY,\n" +
                    "name VARCHAR NOT NULL,\n" +
                    "json VARCHAR NOT NULL,\n" +
                    "max_score INTEGER,\n" +
                    "best_player VARCHAR\n" +
                    ")"
            });
        });
    }

    public query(queryConfig: QueryConfig): Promise<QueryResult> {
        return this.pool.query(queryConfig);
    }

    public close(): Promise<void> {
        console.log("Closing database connections...");
        return this.pool.end();
    }
}
