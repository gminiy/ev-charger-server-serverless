import express from "express";
import { Request, Response, NextFunction } from "express";
import userRouter from "./presentation/routes/user_router";
import chargerRouter from "./presentation/routes/charger_router";
import reviewRouter from "./presentation/routes/review_router";
import faultReportRouter from "./presentation/routes/fault_report_router";
import addressRouter from "./presentation/routes/address_router";
import logger from "morgan";

const app = express();
app.use(express.json());
app.use(logger("dev"));

app.use("/user", userRouter);
app.use("/charger", chargerRouter);
app.use("/review", reviewRouter);
app.use("/fault-report", faultReportRouter);
app.use("/address", addressRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({
    message: "Internal Server error",
    error: err,
  });
});
export default app;
