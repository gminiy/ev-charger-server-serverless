import "reflect-metadata";
import { inject, injectable } from "inversify";
import { TYPES } from "../../di/types";
import {
  PutReviewAttrs,
  ReviewRepository,
  UpdateReviewAttrs,
} from "../../domain/repository/review_repository";
import { AddressRepository } from "../../domain/repository/address_repository";

@injectable()
export class AddressController {
  constructor(
    @inject(TYPES.AddressRepository)
    private addressRepository: AddressRepository
  ) {}

  async findAddresses(pattern: string) {
    return await this.addressRepository.findAddressses(pattern);
  }
}
