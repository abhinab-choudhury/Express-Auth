import { Router, Request, Response } from "express";
import * as AuthControllers from "./../controllers/auth.controllers";
import isAuthenticated from "./../middlewares/is-authenticated.middleware";
import passport from "passport";
import { loginRateLimit } from "./../middlewares/rate-limit";
import "./../config/passport";
import { FRONTEND_URL } from "./../utils/secrets";

const router = Router();

router.post("/signup", AuthControllers.Signup);
router.post(
  "/login",
  loginRateLimit,
  passport.authenticate("local-strategy"),
  (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: "User this Email already exists",
      data: req.user,
      errors: {},
      status: 200,
    });
  },
);

router.post("/reset-password", AuthControllers.ResetPassword);
router.post("/verify-email", AuthControllers.VerifyEmail);
router.post("/verify-code", AuthControllers.VerifyCode);
router.post("/logout", isAuthenticated, AuthControllers.Logout);

router.get(
  "/google",
  passport.authenticate("google-strategy"),
);
router.get(
  "/oauth2/redirect/google",
  passport.authenticate("google-strategy", {
    successReturnToOrRedirect: 'http://localhost:5500/frontend/pages/profile.html',
    keepSessionInfo: true,
  }),
);

router.get("/github", passport.authenticate("github-strategy"));
router.get("/oauth2/redirect/github", passport.authenticate("github-strategy",{
  successReturnToOrRedirect:  'http://localhost:5500/frontend/pages/profile.html',
  keepSessionInfo: true
}));
export default router;
