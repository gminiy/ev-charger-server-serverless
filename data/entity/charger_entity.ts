export interface ChargerEntity {
  id: string;
  address_id: string;
  charger_type: number;
  location: string;
  status: number;
  last_status_updated_at: number;
  output: number;
  last_start_charging_timestamp: number;
  last_end_charging_timestamp: number;
  created_at: number;
  updated_at: number;
  deleted_at?: number;
}
