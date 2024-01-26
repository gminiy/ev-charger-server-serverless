import { ChargerModel } from "../model/charger_model";

export interface ChargerRepository {
  queryChargersByAddressId(addressId: string): Promise<ChargerModel[]>;
}
