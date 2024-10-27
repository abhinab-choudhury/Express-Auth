import { Request, Response, NextFunction } from "express";
import { isHttpError } from "http-errors";

export default function globalErrorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.log("Error : ", err);

  if (isHttpError(err)) {
    res.status(err.status).json({
      message: err.message,
    });
  } else {
    res.status(500).json({
      message: "An unknown error has occured",
    });
  }
}
