import Connection from "./Connection";
import pgp from "pg-promise";
import pg from "pg-promise/typescript/pg-subset";

export default class PostgreSQLAdapter implements Connection {
  private readonly connection: pgp.IDatabase<{}, pg.IClient>;

  constructor() {
    this.connection = pgp()(
      "postgres://postgres:123456@localhost:5432/postgres/app"
    );
  }

  async query(statement: string, params: any): Promise<any> {
    return this.connection.query(statement, params);
  }

  async one(statement: string, params: any): Promise<any> {
    return this.connection.one(statement, params);
  }

  async close(): Promise<void> {
    return this.connection.$pool.end();
  }
}
