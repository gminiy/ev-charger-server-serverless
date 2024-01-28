import { AddressModel } from "../model/address_model";

export interface AddressRepository {
  getAddressses(pattern: string): Promise<AddressModel[]>;
}
