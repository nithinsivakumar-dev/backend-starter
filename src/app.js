import express from "express";
import { indexRouter } from "./routes/index.route.js";
import { corsOptions } from "./config/cors.config.js";
import cors from "cors";

const app = express();

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

export { app };
