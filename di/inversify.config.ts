import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { MySql } from "../data/db/mysql";
import { UserRepository } from "../domain/repository/user_repository";
import { UserRepositoryImpl } from "../data/repository/user_repository_impl";
import { UserController } from "../presentation/controller/user_controller";
import { ChargerRepository } from "../domain/repository/charger_repository";
import { ChargerRepositoryImpl } from "../data/repository/charger_repository_impl";
import { ChargerController } from "../presentation/controller/charger_controller";
import { ReviewRepositoryImpl } from "../data/repository/review_repository_impl";
import { ReviewRepository } from "../domain/repository/review_repository";
import { ReviewController } from "../presentation/controller/review_controller";
import { FaultReportRepository } from "../domain/repository/fault_report_repository";
import { FaultReportRepositoryImpl } from "../data/repository/fault_report_repository_impl";
import { FaultReportController } from "../presentation/controller/fault_report_controller";

const container = new Container();

container.bind<MySql>(TYPES.MySql).to(MySql);

container.bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpl);
container.bind<UserController>(TYPES.UserController).to(UserController);

container
  .bind<ChargerRepository>(TYPES.ChargerRepository)
  .to(ChargerRepositoryImpl);
container
  .bind<ChargerController>(TYPES.ChargerController)
  .to(ChargerController);

container
  .bind<ReviewRepository>(TYPES.ReviewRepository)
  .to(ReviewRepositoryImpl);
container.bind<ReviewController>(TYPES.ReviewController).to(ReviewController);

container
  .bind<FaultReportRepository>(TYPES.FaultReportRepository)
  .to(FaultReportRepositoryImpl);
container
  .bind<FaultReportController>(TYPES.FaultReportController)
  .to(FaultReportController);

export { container };
