import { NextFunction, Request, Response } from "express";

export function randomDelayMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const minDelay = 500;
  const maxDelay = 1400;
  const delay =
    Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

  console.log(delay / 1000, "s de delay");

  setTimeout(next, delay);
}
