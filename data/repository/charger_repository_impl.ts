import "reflect-metadata";
import { MySql, Tables } from "../db/mysql";
import { ChargerRepository } from "../../domain/repository/charger_repository";
import { ChargerModel } from "../../domain/model/charger_model";
import { ChargerEntity } from "../entity/charger_entity";
import { inject, injectable } from "inversify";
import { TYPES } from "../../di/types";

@injectable()
export class ChargerRepositoryImpl implements ChargerRepository {
  constructor(@inject(TYPES.MySql) private db: MySql) {}

  async queryChargersByAddressId(addressId: string): Promise<ChargerModel[]> {
    const rows = await this.db.query(
      `SELECT * FROM ${Tables.chargers} WHERE address_id = ? AND deleted_at IS NULL`,
      [addressId]
    );

    const chargerEntities = rows as ChargerEntity[];

    if (chargerEntities.length == 0) {
      return [];
    }

    return chargerEntities.map(
      (e) =>
        new ChargerModel(
          e.id,
          e.charger_type,
          e.location,
          e.status,
          e.last_status_updated_at,
          e.output,
          e.last_start_charging_timestamp,
          e.last_end_charging_timestamp
        )
    );
  }
}
