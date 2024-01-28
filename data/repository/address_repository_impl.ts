import { inject } from "inversify";
import { AddressModel } from "../../domain/model/address_model";
import { AddressRepository } from "../../domain/repository/address_repository";
import { MySql, Tables } from "../db/mysql";
import { TYPES } from "../../di/types";
import { AddressEntity } from "../entity/address_entity";

export class AddressRepositoryimpl implements AddressRepository {
  constructor(@inject(TYPES.MySql) private db: MySql) {}

  // Todo: address 검색 index 설정
  async getAddressses(str: string): Promise<AddressModel[]> {
    const searchPattern = `%${str}%`;
    const rows = await this.db.query(
      `SELECT * FROM ${Tables.addresses} WHERE address LIKE ? AND deleted_at IS NULL`,
      [searchPattern]
    );
    const addressEntities = rows as AddressEntity[];

    if (addressEntities.length == 0) {
      return [];
    }

    return addressEntities.map((e) => new AddressModel(e.id, e.address));
  }
}

(async () => {
  const db = new MySql();
  const a = new AddressRepositoryimpl(db);

  console.log(await a.getAddressses("500"));
})();
