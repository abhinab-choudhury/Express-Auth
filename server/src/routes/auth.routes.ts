import { Router, Request, Response } from "express";
import * as AuthControllers from "src/controllers/auth.controllers";
import isAuthenticated from "src/middlewares/is-authenticated.middleware";

const router = Router();

router.post("/", (req: Request, res: Response) => {
  // passport local strategy
  res.send("Local Strategy");
});

router.post("/reset-password", AuthControllers.ResetPassword);
router.post("/verify-code", AuthControllers.VerifyCode);
router.post("/logout", isAuthenticated ,AuthControllers.Logout);

router.post("/google", (req: Request, res: Response) => {
  // google OAuth 2.0 Strategy
  res.send("Google OAuth 2.0 Strategy");
});

router.post("/github", (req: Request, res: Response) => {
  // github OAuth Strategy
  res.send("Github OAuth Strategy");
});

export default router;
