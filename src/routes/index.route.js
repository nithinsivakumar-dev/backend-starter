import express from "express";
import { userRouter } from "./user.route.js";
import { authRouter } from "./auth.route.js";

const indexRouter = express.Router();

indexRouter.use("/api/v1/user", userRouter);

indexRouter.use("/api/v1/auth", authRouter);

export { indexRouter };
