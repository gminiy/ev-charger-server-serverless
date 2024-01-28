import { AddressModel } from "../model/address_model";

export interface AddressRepository {
  findAddressses(pattern?: string): Promise<AddressModel[]>;
}
