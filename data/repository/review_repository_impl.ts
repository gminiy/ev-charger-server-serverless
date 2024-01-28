import { MySql, Tables } from "../db/mysql";
import {
  PutReviewAttrs,
  ReviewRepository,
  UpdateReviewAttrs,
} from "../../domain/repository/review_repository";
import { ReviewModel } from "../../domain/model/review_model";
import { ReviewEntity } from "../entity/review_entity";
import "reflect-metadata";
import { inject, injectable } from "inversify";
import { TYPES } from "../../di/types";
import { uuid } from "uuidv4";

export interface ReviewEntityWithNickname extends ReviewEntity {
  nickname: string;
}

@injectable()
export class ReviewRepositoryImpl implements ReviewRepository {
  constructor(@inject(TYPES.MySql) private db: MySql) {}

  async putReview(attrs: PutReviewAttrs): Promise<ReviewModel> {
    const nowUnix: number = Math.floor(Date.now() / 1000);
    const id = uuid();
    await this.db.query(
      `INSERT INTO ${Tables.reviews} (id, title, content, user_id, charger_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)`,
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
      `SELECT ${Tables.reviews}.*, ${Tables.users}.nickname
        FROM ${Tables.reviews}
        LEFT JOIN ${Tables.users} ON ${Tables.reviews}.user_id = ${Tables.users}.id
        WHERE ${Tables.reviews}.id = ?`,
      [id]
    );

    const reviewEntities = rows as ReviewEntityWithNickname[];
    const reviewEntity = reviewEntities[0];

    return new ReviewModel(
      reviewEntity.id,
      reviewEntity.title,
      reviewEntity.content,
      reviewEntity.nickname,
      reviewEntity.charger_id,
      reviewEntity.created_at,
      reviewEntity.updated_at
    );
  }

  async getReviewById(id: string): Promise<ReviewModel | void> {
    const rows = await this.db.query(
      `SELECT ${Tables.reviews}.*, ${Tables.users}.nickname
        FROM ${Tables.reviews}
        LEFT JOIN ${Tables.users} ON ${Tables.reviews}.user_id = ${Tables.users}.id
        WHERE ${Tables.reviews}.id = ?`,
      [id]
    );

    const reviewEntities = rows as ReviewEntityWithNickname[];
    if (reviewEntities.length == 0) {
      return;
    }

    const reviewEntity = reviewEntities[0];

    return new ReviewModel(
      reviewEntity.id,
      reviewEntity.title,
      reviewEntity.content,
      reviewEntity.nickname,
      reviewEntity.charger_id,
      reviewEntity.created_at,
      reviewEntity.updated_at
    );
  }

  async getReviewsByChargerId(chargerId: string): Promise<ReviewModel[]> {
    const rows = await this.db.query(
      `SELECT ${Tables.reviews}.*, ${Tables.users}.nickname
        FROM ${Tables.reviews}
        LEFT JOIN ${Tables.users} ON ${Tables.reviews}.user_id = ${Tables.users}.id
        WHERE ${Tables.reviews}.charger_id = ?`,
      [chargerId]
    );

    const reviewEntities = rows as ReviewEntityWithNickname[];
    if (reviewEntities.length == 0) {
      return [];
    }

    return reviewEntities.map(
      (e) =>
        new ReviewModel(
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

  async updateReview(attrs: UpdateReviewAttrs): Promise<ReviewModel> {
    const nowUnix: number = Math.floor(Date.now() / 1000);
    let queryStr = `UPDATE ${Tables.reviews} SET `;

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

    const updatedReviewModel = await this.getReviewById(attrs.id);
    if (!updatedReviewModel) {
      throw Error();
    }

    return updatedReviewModel;
  }
}
