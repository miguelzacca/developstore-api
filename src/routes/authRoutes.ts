import { Router } from "express";
import auth from "../controllers/authControllers.js";

const router = Router();

router.get("/email-verify/:token", auth.emailVerify);

router.post("/register", auth.register);

router.post("/login", auth.login);

router.get("/passwd-recovery/:email", auth.passwdRecovery);

router.get("/token-validator/:token", auth.tokenValidator);

export default router;
