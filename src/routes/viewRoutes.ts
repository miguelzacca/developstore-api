"use strict";

import { Router } from "express";
import view from "../controllers/viewControllers.js";
import { pendingEmail } from "../middleware/pendingEmail.js";
import { checkToken } from "../middleware/checkToken.js";

const router = Router();

router.get("/", view.homePage);

router.get("/login", view.loginPage);

router.get("/register", view.registerPage);

router.get("/verify-email/:email", pendingEmail, view.verifyEmailPage);

router.get("/account", view.accountPage);

router.get("/recovery-passwd", view.requestToChangePasswdPage);

router.get("/change-passwd/:token", checkToken, view.changePasswdPage);

export default router;
