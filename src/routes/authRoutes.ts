"use strict";

import { Router } from "express";
import {
  login,
  register,
  emailVerify,
} from "../controllers/authControllers.js";

const router = Router();

router.get("/email-verify/:token", emailVerify);

router.post("/register", register);

router.post("/login", login);

export default router;
