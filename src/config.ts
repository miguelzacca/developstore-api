"use strict";

import { config } from "dotenv";
import nodemailer from "nodemailer";
import { IEnv } from "./types/global";

config();

class Config {
  public env: IEnv = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: Number(process.env.PORT),
    HOST: process.env.HOST,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    AUTH_DURATION_DAYS: Number(process.env.AUTH_DURATION_DAYS),
    SECRET: process.env.SECRET,
  };

  public transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: this.env.SMTP_USER,
      pass: this.env.SMTP_PASS,
    },
  });

  public cors = {
    origin: [this.env.HOST],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  };

  public cookie: object = {
    httpOnly: true,
    secure: this.env.NODE_ENV === "production",
    maxAge: this.env.AUTH_DURATION_DAYS * 24 * 60 * 60 * 1000,
    sameSite: "None",
  };

  public authMsg = {
    ok: "Authentication successful.",
    incorrect: "Incorrect password.",
    emailExists: "This email already exists.",
    noEmailToken: "No email token provided.",
    emailAlreadyVerified: "Email already verified.",
    noVerifiedEmail: "No email verified.",
    recoveryEmail: "Recovery email successfully send.",
  };

  public userMsg = {
    notFound: "User not found.",
    created: "User created successfully.",
    deleted: "User deleted successfully.",
    updated: "User updated successfully.",
  };

  public serverMsg = {
    great: "Welcome!",
    err: "A server occurred error. Please try later.",
    denied: "Access denied.",
    invalidToken: "Invalid token.",
  };
}

export default new Config();
