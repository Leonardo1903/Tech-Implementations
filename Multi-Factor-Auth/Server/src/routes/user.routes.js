import { Router } from "express";
import {
  register,
  login,
  status,
  logout,
  setup2fa,
  verify2fa,
  reset2fa,
} from "../controllers/user.controller.js";
import passport from "passport";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", passport.authenticate("local"), login);
router.get("/status", status);
router.post("/logout", logout);

router.post("/2fa/setup", isAuthenticated, setup2fa);
router.post("/2fa/verify", isAuthenticated, verify2fa);
router.post("/2fa/reset", isAuthenticated, reset2fa);

export default router;
