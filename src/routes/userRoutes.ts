"use strict";

import { Router } from "express";
import {
  getUser,
  patchUser,
  deleteUser,
} from "../controllers/userControllers.js";
import { checkToken } from "../middleware/checkToken.js";

const router = Router();

router.get("/", checkToken, getUser);

router.patch("/update", checkToken, patchUser);

router.delete("/delete", checkToken, deleteUser);

export default router;
