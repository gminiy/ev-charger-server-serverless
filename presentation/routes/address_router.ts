import express from "express";
import { Request, Response, NextFunction } from "express";
import { UserController } from "../controller/user_controller";
import { container } from "../../di/inversify.config";
import { TYPES } from "../../di/types";
import { UserModel } from "../../domain/model/user_model";
import { AddressController } from "../controller/address_controller";

const router = express.Router();
const addressController = container.get<AddressController>(
  TYPES.AddressController
);

router.get("/find", async (req, res, next) => {
  try {
    const { pattern } = req.query;

    const addresses = await addressController.findAddresses(
      pattern == undefined ? pattern : pattern.toString()
    );

    const response = addresses.map((address) => {
      return {
        id: address.id,
        address: address.address,
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
