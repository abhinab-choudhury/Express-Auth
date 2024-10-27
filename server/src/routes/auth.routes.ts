import { Router, Request, Response } from "express";

const router = Router();

router.post("/", (req:Request, res:Response) => {
  // passport local strategy
  res.send("Local Strategy");
});

router.post("/google", (req:Request, res:Response) => {
  // google OAuth 2.0 Strategy
  res.send("Google OAuth 2.0 Strategy");
});

router.post("/github", (req:Request, res:Response) => {
  // github OAuth Strategy
  res.send("Github OAuth Strategy");
});

export default router;