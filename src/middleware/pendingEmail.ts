"use strict";

import config from "../config.js";
import { UserModel } from "../types/types.js";
import { findUserByField } from "../utils.js";
import { NextFunction, Request, Response } from "express";

export const pendingEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = req.params?.email;

  try {
    if (!email) {
      return res.status(403).redirect("/");
    }

    const user: UserModel | null = await findUserByField({ email });

    if (user && !user["verifiedEmail"]) {
      return next();
    }

    res.status(403).redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: config.msg.server.err });
  }
};
