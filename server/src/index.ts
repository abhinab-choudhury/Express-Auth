import express, { NextFunction, Request, Response } from "express";
import AuthRoutes from "./routes/auth.routes";
import UserRoutes from "./routes/user.routes";
import globalErrorHandler from "./middlewares/error-handler.middleware";
import createHttpError from "http-errors";
import cors from "cors";
import { FRONTEND_URL, NODE_ENV } from "./utils/secrets";
import morgan from "morgan";
import session from "express-session";
import sessionConfig from "./config/session";

const app = express();

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
if (NODE_ENV === "proproduction") {
  app.set("true proxy", true);
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}
app.use(session(sessionConfig));

// Routes
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/user", UserRoutes);
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    message: "Server is Healthy",
    data: {},
    errors: {},
    success: true,
    status: 200,
  });
});
app.get("/", (_req: Request, res: Response) => {
  res.send("<h1>Express Typescript on Vercel</h1>");
});

app.listen(8080, () => {
  console.log(`⚙️  Server running on PORT:${8080}`);
});

// api route error-handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  next(createHttpError(404, "Endpoint Not Found"));
});

// Global Catch
app.use(globalErrorHandler);
