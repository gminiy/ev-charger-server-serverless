import "reflect-metadata";
import { UserEntity } from "../entity/user_entity";
import { MySql, Tables } from "../db/mysql";
import {
  PutUserAttrs,
  UpdateUserAttrs,
  UserRepository,
} from "../../domain/repository/user_repository";
import { UserModel } from "../../domain/model/user_model";
import { inject, injectable } from "inversify";
import { TYPES } from "../../di/types";

export interface UserEntityWithAddress extends UserEntity {
  address?: string;
}

@injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(@inject(TYPES.MySql) private db: MySql) {}

  async putUser(attrs: PutUserAttrs): Promise<UserModel> {
    const nowUnix: number = Math.floor(Date.now() / 1000);
    const nickname: string = attrs.nickname ?? "unnamed";

    await this.db.query(
      `INSERT INTO ${Tables.users} (id, nickname, address_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?)`,
      [attrs.id, nickname, attrs.addressId ?? undefined, nowUnix, nowUnix]
    );

    const putUserModel = await this.getUserById(attrs.id);

    if (!putUserModel) {
      throw Error();
    }

    return putUserModel;
  }

  async getUserById(id: string): Promise<UserModel | void> {
    const rows = await this.db.query(
      `SELECT ${Tables.users}.*, ${Tables.addresses}.address
      FROM ${Tables.users}
      LEFT JOIN ${Tables.addresses} ON ${Tables.users}.address_id = ${Tables.addresses}.id
      WHERE ${Tables.users}.id = ? AND ${Tables.users}.deleted_at IS NULL`,
      [id]
    );

    const userEntities = rows as UserEntityWithAddress[];

    if (userEntities.length == 0) {
      return;
    }

    const userEntity: UserEntityWithAddress = userEntities[0];

    return new UserModel(
      userEntity.id,
      userEntity.nickname,
      userEntity.created_at,
      userEntity.address,
      userEntity.address_id
    );
  }

  async updateUser(attrs: UpdateUserAttrs): Promise<UserModel> {
    const nowUnix: number = Math.floor(Date.now() / 1000);
    let queryStr = `UPDATE ${Tables.users} SET `;

    for (let attr of Object.keys(attrs)) {
      if (attrs[attr] !== undefined) {
        switch (attr) {
          case "addressId":
            queryStr = queryStr + `address_id = '${attrs[attr]}', `;
            break;
          case "nickname":
            queryStr = queryStr + `nickname = '${attrs[attr]}', `;
            break;
          default:
            break;
        }
      }
    }
    queryStr = queryStr + `updated_at = ${nowUnix} WHERE id = '${attrs.id}'`;

    await this.db.query(queryStr);

    const updatedUserModel = await this.getUserById(attrs.id);

    if (!updatedUserModel) {
      throw Error();
    }

    return updatedUserModel;
  }
}
