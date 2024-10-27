import express, { NextFunction, Request, Response } from "express";
import AuthRouter from './routes/auth.routes';

const app = express();

app.use("/auth", AuthRouter);

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    message: "Server is Healthy",
    data: {},
    errors: {},
    success: true
    status: 200,
  });
});

// Home Route
app.get("/", (_req: Request, res: Response) => {
  res.send("<h1>Express Typescript on Vercel</h1>");
});

app.listen(8080, () => {
  console.log(`Server running on PORT:${8080}`);
});

// Global Catch
app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
