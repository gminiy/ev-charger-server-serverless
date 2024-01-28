import { inject } from "inversify";
import { AddressModel } from "../../domain/model/address_model";
import { AddressRepository } from "../../domain/repository/address_repository";
import { MySql, Tables } from "../db/mysql";
import { TYPES } from "../../di/types";
import { AddressEntity } from "../entity/address_entity";

export class AddressRepositoryimpl implements AddressRepository {
  constructor(@inject(TYPES.MySql) private db: MySql) {}

  // Todo: address 검색 index 설정
  async findAddressses(pattern?: string): Promise<AddressModel[]> {
    let queryStr = `SELECT * FROM ${Tables.addresses} WHERE deleted_at IS NULL`;
    const queryParams = [];

    if (pattern) {
      queryStr += ` AND address LIKE ?`;
      const searchPattern = `%${pattern}%`;
      queryParams.push(searchPattern);
    }

    const rows = await this.db.query(queryStr, queryParams);

    const addressEntities = rows as AddressEntity[];

    if (addressEntities.length == 0) {
      return [];
    }

    return addressEntities.map((e) => new AddressModel(e.id, e.address));
  }
}
