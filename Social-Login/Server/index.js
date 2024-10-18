import session from "express-session";
import express from "express";
import cors from "cors";
import passport from "passport";
import { passportSetup } from "./passport.js";
import authRoute from "./routes/auth.js";
const app = express();

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    maxAge: 3600000,
  })
);

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoute);

app.listen("5000", () => {
  console.log("Server is running on port 5000");
});
