import "reflect-metadata";
import "dotenv/config";
import { injectable } from "inversify";
import * as mysql from "mysql2";

export enum Tables {
  users = "users",
  addresses = "addresses",
  chargers = "chargers",
  faultReports = "fault_reports",
  reviews = "reviews",
}

@injectable()
export class MySql {
  private pool;
  private promisePool;

  constructor() {
    this.pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      password: process.env.MYSQL_PASSWORD,
      user: process.env.MYSQL_USER,
      database: "ev_charger_app_database",
    });
    this.promisePool = this.pool.promise();
  }

  async query(sql: string, values?: any[]) {
    const [rows] = await this.promisePool.query(sql, values);

    return rows;
  }
}
