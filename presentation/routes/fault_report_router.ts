import express from "express";
import { Request, Response, NextFunction } from "express";
import { container } from "../../di/inversify.config";
import { TYPES } from "../../di/types";
import { ReviewController } from "../controller/review_controller";
import { ReviewModel } from "../../domain/model/review_model";
import { FaultReportModel } from "../../domain/model/fault_report_model";
import { FaultReportController } from "../controller/fault_report_controller";

const router = express.Router();
const faultReportController = container.get<FaultReportController>(
  TYPES.FaultReportController
);

router.get("/:chargerId", async (req, res, next) => {
  try {
    const { chargerId } = req.params;

    if (!chargerId) {
      throw Error();
    }

    const faultReports = await faultReportController.getFaultReportsByChargerId(
      chargerId
    );

    const response = faultReports.map((faultReport) => {
      return {
        id: faultReport.id,
        title: faultReport.title,
        content: faultReport.content,
        userNickname: faultReport.userNickname,
        chargerId: faultReport.chargerId,
        createdAt: faultReport.createdAt,
        updatedAt: faultReport.updatedAt,
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

    const faultReport: FaultReportModel =
      await faultReportController.putFaultReport({
        title,
        content,
        userId,
        chargerId,
      });

    const response = {
      id: faultReport.id,
      title: faultReport.title,
      content: faultReport.content,
      userNickname: faultReport.userNickname,
      chargerId: faultReport.chargerId,
      createdAt: faultReport.createdAt,
      updatedAt: faultReport.updatedAt,
    };

    res.json(response);
  } catch (e) {
    next(e);
  }
});

router.post("/update", async (req, res, next) => {
  try {
    const { id, title, content } = req.body;

    const faultReport: FaultReportModel =
      await faultReportController.updateFaultReport({
        id,
        title,
        content,
      });

    const response = {
      id: faultReport.id,
      title: faultReport.title,
      content: faultReport.content,
      userNickname: faultReport.userNickname,
      chargerId: faultReport.chargerId,
      createdAt: faultReport.createdAt,
      updatedAt: faultReport.updatedAt,
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
