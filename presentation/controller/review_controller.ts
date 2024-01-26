import "reflect-metadata";
import { inject, injectable } from "inversify";
import { TYPES } from "../../di/types";
import {
  PutReviewAttrs,
  ReviewRepository,
  UpdateReviewAttrs,
} from "../../domain/repository/review_repository";

@injectable()
export class ReviewController {
  constructor(
    @inject(TYPES.ReviewRepository) private reviewRepository: ReviewRepository
  ) {}

  async getReviewsByChargerId(chargerId: string) {
    return await this.reviewRepository.getReviewsByChargerId(chargerId);
  }

  async putReview(attrs: PutReviewAttrs) {
    return await this.reviewRepository.putReview(attrs);
  }

  async updateReview(attrs: UpdateReviewAttrs) {
    return await this.reviewRepository.updateReview(attrs);
  }
}
