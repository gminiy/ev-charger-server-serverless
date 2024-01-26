export interface UserEntity {
  id: string;
  address_id?: string;
  nickname: string;
  created_at: number;
  updated_at: number;
  deleted_at?: number;
}
