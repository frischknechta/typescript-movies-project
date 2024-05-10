import express, { Application, Request, Response } from "express";

import cors from "cors";
import { envVariables } from "./utils/envVariables";
import morgan from "morgan";
import { moviesRouter } from "./routes/movies";
import { randomDelayMiddleware } from "./utils/randomDelayMiddleware";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(randomDelayMiddleware);
app.use(moviesRouter);

app.get("/", (req: Request, res: Response) => {
  res.json("Typescript with Express");
});

const portInYellow = `\x1b[33m${envVariables.PORT}\x1b[0m`;
const nodeEnvInGreen = `\x1b[32m${envVariables.NODE_ENV}\x1b[0m`;

app.listen(envVariables.PORT, () => {
  console.log(
    `Server is running on port ${portInYellow} in ${nodeEnvInGreen} mode 🚀🚀🚀`
  );
});
