import "reflect-metadata";
import { inject, injectable } from "inversify";
import { TYPES } from "../../di/types";
import {
  FaultReportRepository,
  PutFaultReportAttrs,
  UpdateFaultReportAttrs,
} from "../../domain/repository/fault_report_repository";

@injectable()
export class FaultReportController {
  constructor(
    @inject(TYPES.FaultReportRepository)
    private faultReportRepository: FaultReportRepository
  ) {}

  async getFaultReportsByChargerId(chargerId: string) {
    return await this.faultReportRepository.getFaultReportsByChargerId(
      chargerId
    );
  }

  async putFaultReport(attrs: PutFaultReportAttrs) {
    return await this.faultReportRepository.putFaultReport(attrs);
  }

  async updateFaultReport(attrs: UpdateFaultReportAttrs) {
    return await this.faultReportRepository.updateFaultReport(attrs);
  }
}
