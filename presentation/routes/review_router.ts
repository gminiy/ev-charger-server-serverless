import express from "express";
import { Request, Response, NextFunction } from "express";
import { container } from "../../di/inversify.config";
import { TYPES } from "../../di/types";
import { ReviewController } from "../controller/review_controller";
import { ReviewModel } from "../../domain/model/review_model";

const router = express.Router();
const reviewController = container.get<ReviewController>(
  TYPES.ReviewController
);

router.get("/:chargerId", async (req, res, next) => {
  try {
    const { chargerId } = req.params;

    if (!chargerId) {
      throw Error();
    }

    const reviews = await reviewController.getReviewsByChargerId(chargerId);

    const response = reviews.map((review) => {
      return {
        id: review.id,
        title: review.title,
        content: review.content,
        userNickname: review.userNickname,
        chargerId: review.chargerId,
        createdAt: review.createdAt,
        updatedAt: review.updatedAt,
      };
    });

    res.json(response);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const { title, content, userId, chargerId } = req.body;

    const review: ReviewModel = await reviewController.putReview({
      title,
      content,
      userId,
      chargerId,
    });

    const response = {
      id: review.id,
      title: review.title,
      content: review.content,
      userNickname: review.userNickname,
      chargerId: review.chargerId,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    };

    res.json(response);
  } catch (e) {
    next(e);
  }
});

router.post("/update", async (req, res, next) => {
  try {
    const { id, title, content } = req.body;

    const review: ReviewModel = await reviewController.updateReview({
      id,
      title,
      content,
    });

    const response = {
      id: review.id,
      title: review.title,
      content: review.content,
      userNickname: review.userNickname,
      chargerId: review.chargerId,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    };

    res.json(response);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({
    message: "Internal Server error",
    error: err,
  });
});

export default router;
