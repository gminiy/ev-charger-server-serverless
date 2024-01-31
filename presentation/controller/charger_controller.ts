import "reflect-metadata";
import { inject, injectable } from "inversify";
import { TYPES } from "../../di/types";
import { ChargerRepository } from "../../domain/repository/charger_repository";

@injectable()
export class ChargerController {
  constructor(
    @inject(TYPES.ChargerRepository)
    private chargerRepository: ChargerRepository
  ) {}

  async getChargersByAddressId(addressId: string) {
    return await this.chargerRepository.queryChargersByAddressId(addressId);
  }

  async getCharger(chargerId: string) {
    return await this.chargerRepository.getCharger(chargerId);
  }
}
