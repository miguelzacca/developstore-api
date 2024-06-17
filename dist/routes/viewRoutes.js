"use strict";
import express from "express";
import { homePage, loginPage, registerPage, } from "../controllers/viewControllers.js";
const router = express.Router();
router.get("/", homePage);
router.get("/login", loginPage);
router.get("/register", registerPage);
export default router;
