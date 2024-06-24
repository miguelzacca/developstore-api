"use strict";

import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { IEnv } from "./types/global";

dotenv.config();

const {
  NODE_ENV,
  PORT,
  HOST,
  SMTP_USER,
  SMTP_PASS,
  AUTH_DURATION_DAYS,
  SECRET,
} = process.env;

export default {
  env: {
    NODE_ENV,
    PORT: Number(PORT),
    HOST,
    SMTP_USER,
    AUTH_DURATION_DAYS: Number(AUTH_DURATION_DAYS),
    SECRET,
  } as IEnv,

  transporter: nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  }),

  cors: {
    origin: [HOST as string],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  },

  cookie: {
    httpOnly: true,
    secure: (NODE_ENV as string) === "production",
    maxAge: Number(AUTH_DURATION_DAYS) * 24 * 60 * 60 * 1000,
    sameSite: "None",
  },

  msg: {
    auth: {
      ok: "Authentication successful.",
      incorrect: "Incorrect password.",
      emailExists: "This email already exists.",
      noEmailToken: "No email token provided.",
      emailAlreadyVerified: "Email already verified.",
      noVerifiedEmail: "No email verified.",
    },

    user: {
      notFound: "User not found.",
      created: "User created successfully.",
      deleted: "User deleted successfully.",
      updated: "User updated successfully.",
    },

    server: {
      great: "Welcome!",
      err: "A server occurred error. Please try later.",
      denied: "Access denied.",
      invalidToken: "Invalid token.",
    },
  },
};
