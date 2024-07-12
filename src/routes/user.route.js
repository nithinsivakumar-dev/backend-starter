import express from "express";
import { userController } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.route("/").get(userController.read);

userRouter.route("/:id").get(userController.readOne);

userRouter.route("/:id").put(userController.update);

userRouter.route("/reset/:id").patch(userController.changePassword);

userRouter.route("/:id").delete(userController.delete);

export { userRouter };
