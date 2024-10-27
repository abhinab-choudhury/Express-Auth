import express from "express";
import * as UserControllers from "./../controllers/user.controllers";
import isAuthenticated from "./../middlewares/is-authenticated.middleware";

const router = express.Router();

router.get("/me", isAuthenticated, UserControllers.getAuthenticatedUser);
router.post("/update", isAuthenticated, UserControllers.updateUser);
router.get(
  "/profile/:username",
  isAuthenticated,
  UserControllers.getUserByEmail,
);
router.get("/users", isAuthenticated, UserControllers.getUsers);
router.delete("/me", isAuthenticated, UserControllers.DeleteAccount);

export default router;
