export class ReviewModel {
  constructor(
    public id: string,
    public title: string,
    public content: string,
    public userNickname: string,
    public chargerId: string,
    public createdAt: number,
    public updatedAt: number
  ) {}
}
