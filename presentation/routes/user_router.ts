import express from "express";
import { Request, Response, NextFunction } from "express";
import { UserController } from "../controller/user_controller";
import { container } from "../../di/inversify.config";
import { TYPES } from "../../di/types";
import { UserModel } from "../../domain/model/user_model";

const router = express.Router();
const userController = container.get<UserController>(TYPES.UserController);

router.get("/", async (req, res, next) => {
  try {
    const { id } = req.query;

    if (!id) {
      throw Error();
    }

    const user = await userController.getUserById(id.toString());

    if (!user) {
      res.status(404);
      res.send();
      return;
    }

    const response = {
      id: user.id,
      nickname: user.nickname,
      addressId: user.addressId,
      address: user.address,
    };

    res.json(response);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const { id, nickname, addressId } = req.body;

    const user: UserModel = await userController.putUser({
      id,
      nickname,
      addressId,
    });

    const response = {
      id: user.id,
      nickname: user.nickname,
      addressId: user.addressId,
      address: user.address,
    };

    res.json(response);
  } catch (e) {
    next(e);
  }
});

router.post("/update", async (req, res, next) => {
  try {
    const { id, nickname, addressId } = req.body;

    const user: UserModel = await userController.updateUser({
      id,
      nickname,
      addressId,
    });

    const response = {
      id: user.id,
      nickname: user.nickname,
      addressId: user.addressId,
      address: user.address,
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
