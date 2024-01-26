export interface ReviewEntity {
  id: string;
  title: string;
  content: string;
  user_id: string;
  charger_id: string;
  created_at: number;
  updated_at: number;
  deleted_at?: number;
}
