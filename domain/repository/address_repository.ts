import { AddressModel } from "../model/address_model";

export interface AddressRepository {
  getAddressses(str: string): Promise<AddressModel[]>;
}
