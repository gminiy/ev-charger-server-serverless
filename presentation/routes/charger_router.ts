import express from "express";
import { Request, Response, NextFunction } from "express";
import { container } from "../../di/inversify.config";
import { TYPES } from "../../di/types";
import { ChargerController } from "../controller/charger_controller";

const router = express.Router();
const chargerController = container.get<ChargerController>(
  TYPES.ChargerController
);
router.get("/", async (req, res, next) => {
  try {
    const { chargerId } = req.query;

    if (!chargerId || typeof chargerId !== "string") {
      throw Error();
    }

    const charger = await chargerController.getCharger(chargerId.toString());

    if (!charger) {
      res.status(404);
      res.send();
      return;
    }

    const response = {
      id: charger.id,
      addressId: charger.addressId,
      chargeType: charger.chargeType,
      location: charger.location,
      status: charger.status,
      lastStatusUpdatedAt: charger.lastStatusUpdatedAt,
      output: charger.output,
      lastStartChargingTimestamp: charger.lastStartChargingTimestamp,
      lastEndChargingTimestamp: charger.lastEndChargingTimestamp,
    };

    res.json(response);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.get("/address", async (req, res, next) => {
  try {
    const { addressId } = req.query;

    if (!addressId || typeof addressId !== "string") {
      throw Error();
    }

    const chargers = await chargerController.getChargersByAddressId(
      addressId.toString()
    );

    const response = chargers.map((charger) => {
      return {
        id: charger.id,
        addressId: charger.addressId,
        chargeType: charger.chargeType,
        location: charger.location,
        status: charger.status,
        lastStatusUpdatedAt: charger.lastStatusUpdatedAt,
        output: charger.output,
        lastStartChargingTimestamp: charger.lastStartChargingTimestamp,
        lastEndChargingTimestamp: charger.lastEndChargingTimestamp,
      };
    });

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
