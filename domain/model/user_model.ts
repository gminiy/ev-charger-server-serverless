export class UserModel {
  constructor(
    public id: string,
    public nickname: string,
    public createdAt: number,
    public address?: string,
    public addressId?: string
  ) {}
}
