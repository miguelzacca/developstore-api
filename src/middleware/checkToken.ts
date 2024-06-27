"use strict";

import config from "../config.js";
import { IMiddleware } from "../types/global.js";
import utils from "../utils.js";

export const checkToken: IMiddleware = (req, res, next) => {
  const token = req.cookies?.token || req.params?.token;

  if (!token) {
    return res.status(403).json({ msg: config.serverMsg.denied });
  }

  try {
    utils.jwtVerify(token);
    next();
  } catch (err) {
    res.status(401).json({ msg: config.serverMsg.invalidToken });
  }
};
