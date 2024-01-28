import { MySql, Tables } from "../db/mysql";
import "reflect-metadata";
import { inject, injectable } from "inversify";
import { TYPES } from "../../di/types";
import { uuid } from "uuidv4";
import { FaultReportModel } from "../../domain/model/fault_report_model";
import {
  FaultReportRepository,
  PutFaultReportAttrs,
  UpdateFaultReportAttrs,
} from "../../domain/repository/fault_report_repository";
import { FaultReportEntity } from "../entity/fault_report_entity";

export interface FaultReportEntityWithNickname extends FaultReportEntity {
  nickname: string;
}

@injectable()
export class FaultReportRepositoryImpl implements FaultReportRepository {
  constructor(@inject(TYPES.MySql) private db: MySql) {}

  async putFaultReport(attrs: PutFaultReportAttrs): Promise<FaultReportModel> {
    const nowUnix: number = Math.floor(Date.now() / 1000);
    const id = uuid();
    await this.db.query(
      `INSERT INTO ${Tables.faultReports} (id, title, content, user_id, charger_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        attrs.title,
        attrs.content,
        attrs.userId,
        attrs.chargerId,
        nowUnix,
        nowUnix,
      ]
    );

    const rows = await this.db.query(
      `SELECT ${Tables.faultReports}.*, ${Tables.users}.nickname
        FROM ${Tables.faultReports}
        LEFT JOIN ${Tables.users} ON ${Tables.faultReports}.user_id = ${Tables.users}.id
        WHERE ${Tables.faultReports}.id = ?`,
      [id]
    );

    const reviewEntities = rows as FaultReportEntityWithNickname[];
    const reviewEntity = reviewEntities[0];

    return new FaultReportModel(
      reviewEntity.id,
      reviewEntity.title,
      reviewEntity.content,
      reviewEntity.nickname,
      reviewEntity.charger_id,
      reviewEntity.created_at,
      reviewEntity.updated_at
    );
  }

  async getFaultReportById(id: string): Promise<FaultReportModel | void> {
    const rows = await this.db.query(
      `SELECT ${Tables.faultReports}.*, ${Tables.users}.nickname
        FROM ${Tables.faultReports}
        LEFT JOIN ${Tables.users} ON ${Tables.faultReports}.user_id = ${Tables.users}.id
        WHERE ${Tables.faultReports}.id = ?`,
      [id]
    );

    const reviewEntities = rows as FaultReportEntityWithNickname[];
    if (reviewEntities.length == 0) {
      return;
    }

    const reviewEntity = reviewEntities[0];

    return new FaultReportModel(
      reviewEntity.id,
      reviewEntity.title,
      reviewEntity.content,
      reviewEntity.nickname,
      reviewEntity.charger_id,
      reviewEntity.created_at,
      reviewEntity.updated_at
    );
  }

  async getFaultReportsByChargerId(
    chargerId: string
  ): Promise<FaultReportModel[]> {
    const rows = await this.db.query(
      `SELECT ${Tables.faultReports}.*, ${Tables.users}.nickname
        FROM ${Tables.faultReports}
        LEFT JOIN ${Tables.users} ON ${Tables.faultReports}.user_id = ${Tables.users}.id
        WHERE ${Tables.faultReports}.charger_id = ?`,
      [chargerId]
    );

    const reviewEntities = rows as FaultReportEntityWithNickname[];
    if (reviewEntities.length == 0) {
      return [];
    }

    return reviewEntities.map(
      (e) =>
        new FaultReportModel(
          e.id,
          e.title,
          e.content,
          e.nickname,
          e.charger_id,
          e.created_at,
          e.updated_at
        )
    );
  }

  async updateFaultReport(
    attrs: UpdateFaultReportAttrs
  ): Promise<FaultReportModel> {
    const nowUnix: number = Math.floor(Date.now() / 1000);
    let queryStr = `UPDATE ${Tables.faultReports} SET `;

    for (let attr of Object.keys(attrs)) {
      if (attrs[attr] !== undefined) {
        switch (attr) {
          case "title":
            queryStr = queryStr + `title = '${attrs[attr]}', `;
            break;
          case "content":
            queryStr = queryStr + `content = '${attrs[attr]}', `;
            break;
          default:
            break;
        }
      }
    }
    queryStr = queryStr + `updated_at = ${nowUnix} WHERE id = '${attrs.id}'`;
    await this.db.query(queryStr);

    const updatedFaultReportModel = await this.getFaultReportById(attrs.id);
    if (!updatedFaultReportModel) {
      throw Error();
    }

    return updatedFaultReportModel;
  }
}
