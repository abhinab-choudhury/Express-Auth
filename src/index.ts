import express, { NextFunction, Request, Response } from "express";

const app = express();

// Health Route
app.get("/", (_req: Request, res: Response) => {
  res.status(200).send("Server Running Successfully.");
});

app.listen(8080, () => {
  console.log(`Server running on PORT:${8080}`);
});

// Global Catch
app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
