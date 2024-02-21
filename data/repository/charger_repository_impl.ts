import "reflect-metadata";
import { MySql, Tables } from "../db/mysql";
import { ChargerRepository } from "../../domain/repository/charger_repository";
import { ChargerModel } from "../../domain/model/charger_model";
import { ChargerEntity } from "../entity/charger_entity";
import { inject, injectable } from "inversify";
import { TYPES } from "../../di/types";

export interface ChargerEntityWithAddress extends ChargerEntity {
  address: string;
}

@injectable()
export class ChargerRepositoryImpl implements ChargerRepository {
  constructor(@inject(TYPES.MySql) private db: MySql) {}

  async queryChargersByAddressId(addressId: string): Promise<ChargerModel[]> {
    const rows = await this.db.query(
      `SELECT ${Tables.chargers}.*, ${Tables.addresses}.address FROM ${Tables.chargers}
      LEFT JOIN ${Tables.addresses} ON ${Tables.chargers}.address_id = ${Tables.addresses}.id
      WHERE ${Tables.chargers}.address_id = ? AND ${Tables.chargers}.deleted_at IS NULL`,
      [addressId]
    );

    const chargerEntities = rows as ChargerEntityWithAddress[];

    if (chargerEntities.length == 0) {
      return [];
    }

    return chargerEntities.map(
      (e) =>
        new ChargerModel(
          e.id,
          e.address_id,
          e.address,
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

  async getCharger(chargerId: string): Promise<ChargerModel | void> {
    const rows = await this.db.query(
      `SELECT ${Tables.chargers}.*, ${Tables.addresses}.address FROM ${Tables.chargers}
      LEFT JOIN ${Tables.addresses} ON ${Tables.chargers}.address_id = ${Tables.addresses}.id
      WHERE ${Tables.chargers}.id = ? AND ${Tables.chargers}.deleted_at IS NULL`,
      [chargerId]
    );

    const chargerEntities = rows as ChargerEntityWithAddress[];

    if (chargerEntities.length == 0) {
      return;
    }
    const chargerEntity: ChargerEntityWithAddress = chargerEntities[0];

    return new ChargerModel(
      chargerEntity.id,
      chargerEntity.address_id,
      chargerEntity.address,
      chargerEntity.charger_type,
      chargerEntity.location,
      chargerEntity.status,
      chargerEntity.last_status_updated_at,
      chargerEntity.output,
      chargerEntity.last_start_charging_timestamp,
      chargerEntity.last_end_charging_timestamp
    );
  }
}
