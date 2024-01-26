import { FaultReportModel } from "../model/fault_report_model";

export interface PutFaultReportAttrs {
  [key: string]: string | undefined;
  title: string;
  content: string;
  userId: string;
  chargerId: string;
}

export interface UpdateFaultReportAttrs {
  [key: string]: string | undefined;
  id: string;
  title?: string;
  content?: string;
}

export interface FaultReportRepository {
  putFaultReport(attrs: PutFaultReportAttrs): Promise<FaultReportModel>;
  updateFaultReport(attrs: UpdateFaultReportAttrs): Promise<FaultReportModel>;
  getFaultReportById(id: string): Promise<FaultReportModel | void>;
  getFaultReportsByChargerId(chargerId: string): Promise<FaultReportModel[]>;
}
