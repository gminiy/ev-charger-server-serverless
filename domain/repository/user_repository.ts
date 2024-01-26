import { UserModel } from "../model/user_model";

export interface PutUserAttrs {
  [key: string]: string | undefined;
  id: string;
  addressId?: string;
  nickname?: string;
}

export interface UpdateUserAttrs {
  [key: string]: string | undefined;
  id: string;
  addressId?: string;
  nickname?: string;
}

export interface UserRepository {
  putUser(attrs: PutUserAttrs): Promise<UserModel>;
  getUserById(id: string): Promise<UserModel | void>;
  updateUser(attrs: UpdateUserAttrs): Promise<UserModel>;
}
