"use strict";

import config from "../config.js";
import { IMiddleware } from "../types/global.js";
import { findUserByField } from "../utils.js";

export const pendingEmail: IMiddleware = async (req, res, next) => {
  const email = req.params?.email;

  try {
    if (!email) {
      return res.status(403).redirect("/");
    }

    const user = await findUserByField({ email });

    if (user && !user["verifiedEmail"]) {
      return next();
    }

    res.status(403).redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: config.serverMsg.err });
  }
};
