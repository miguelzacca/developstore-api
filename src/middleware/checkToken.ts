"use strict";

import { NextFunction, Response, Request } from "express";
import config from "../config.js";
import { jwtVerify } from "../utils.js";

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(403).json({ msg: config.msg.server.denied });
  }

  try {
    jwtVerify(token);
    next();
  } catch (err) {
    res.status(401).json({ msg: config.msg.server.invalidToken });
  }
};
