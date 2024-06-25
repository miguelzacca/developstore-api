"use strict";

import { Router } from "express";
import {
  accountPage,
  homePage,
  loginPage,
  registerPage,
  verifyEmailPage,
} from "../controllers/viewControllers.js";
import { pendingEmail } from "../middleware/pendingEmail.js";

const router = Router();

router.get("/", homePage);

router.get("/login", loginPage);

router.get("/register", registerPage);

router.get("/verify-email/:email", pendingEmail, verifyEmailPage);

router.get("/account", accountPage);

export default router;
