import bcryptjs from "bcryptjs";
import User from "../models/user.models.js";
import speakeasy from "speakeasy";
import qrCode from "qrcode";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Missing username or password" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      isMfaActive: false,
    });
    console.log("New user", newUser);
    await newUser.save();
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error registering user",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  console.log("The authenticated user is: ", req.user);
  res.status(200).json({
    message: "User logged in successfully",
    username: req.user.username,
    isMfaActive: req.user.isMfaActive,
  });
};

export const status = async (req, res) => {
  if (req.user) {
    res.status(200).json({
      message: "User is authenticated",
      username: req.user.username,
      isMfaActive: req.user.isMfaActive,
    });
  } else {
    res.status(401).json({ message: "User is not authenticated" });
  }
};

export const logout = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "User is not authenticated" });
  }
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      //Clear cookies
      res.clearCookie("connect.sid");
      res.status(200).json({ message: "User logged out successfully" });
    });
  });
};

export const setup2fa = async (req, res) => {
  try {
    console.log("User", req.user);
    const user = req.user;
    var secret = speakeasy.generateSecret();
    console.log("Secret", secret);

    user.twoFactorSecret = secret.base32;
    user.isMfaActive = true;
    await user.save();
    const url = speakeasy.otpauthURL({
      secret: secret.base32,
      label: `${req.user.username}`,
      issuer: "www.example.com",
      encoding: "base32",
    });

    const qrImageUrl = await qrCode.toDataURL(url);
    res.status(200).json({
      message: "2FA setup successfully",
      qrImageUrl,
      secret: secret.base32,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error setting up 2FA",
      error: error.message,
    });
  }
};

export const verify2fa = async (req, res) => {
  const { token } = req.body;
  const user = req.user;

  const verified = speakeasy.totp.verify({
    secret: user.twoFactorSecret,
    encoding: "base32",
    token,
  });

  if (verified) {
    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ message: "2FA verified successfully", token });
  } else {
    res.status(401).json({ message: "Invalid 2FA token" });
  }
};

export const reset2fa = async (req, res) => {
  try {
    const user = req.user;
    user.isMfaActive = false;
    user.twoFactorSecret = null;
    await user.save();
    res.status(200).json({ message: "2FA reset successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error resetting 2FA",
      error: error.message,
    });
  }
};
