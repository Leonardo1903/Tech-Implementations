import { Router } from "express";
import passport from "passport";

const authRoute = Router();
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

authRoute.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }
});

authRoute.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

authRoute.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect(CLIENT_URL);
  });
});

authRoute.get(
  "/google",
  passport.authenticate("google", { scope: ["profile"] })
);

authRoute.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

authRoute.get(
  "/github",
  passport.authenticate("github", { scope: ["profile"] })
);

authRoute.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

export default authRoute;
