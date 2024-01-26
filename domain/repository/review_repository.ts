import { ReviewModel } from "../model/review_model";

export interface PutReviewAttrs {
  [key: string]: string | undefined;
  title: string;
  content: string;
  userId: string;
  chargerId: string;
}

export interface UpdateReviewAttrs {
  [key: string]: string | undefined;
  id: string;
  title?: string;
  content?: string;
}

export interface ReviewRepository {
  putReview(attrs: PutReviewAttrs): Promise<ReviewModel>;
  updateReview(attrs: UpdateReviewAttrs): Promise<ReviewModel>;
  getReviewById(id: string): Promise<ReviewModel | void>;
  getReviewsByChargerId(chargerId: string): Promise<ReviewModel[]>;
}
