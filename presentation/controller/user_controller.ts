import "reflect-metadata";
import { inject, injectable } from "inversify";
import {
  PutUserAttrs,
  UpdateUserAttrs,
  UserRepository,
} from "../../domain/repository/user_repository";
import { TYPES } from "../../di/types";

@injectable()
export class UserController {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: UserRepository
  ) {}

  async putUser(attrs: PutUserAttrs) {
    return await this.userRepository.putUser(attrs);
  }

  async updateUser(attrs: UpdateUserAttrs) {
    return await this.userRepository.updateUser(attrs);
  }

  async getUserById(id: string) {
    return await this.userRepository.getUserById(id);
  }
}
