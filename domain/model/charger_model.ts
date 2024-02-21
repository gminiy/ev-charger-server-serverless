export class ChargerModel {
  constructor(
    public id: string,
    public addressId: string,
    public address: string,
    public chargeType: number,
    public location: string,
    public status: number,
    public lastStatusUpdatedAt: number,
    public output: number,
    public lastStartChargingTimestamp?: number,
    public lastEndChargingTimestamp?: number
  ) {}
}
