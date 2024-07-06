import config from "../config.js";
import { Middleware } from "../types/global.js";
import utils from "../utils.js";

export const checkToken: Middleware = (req, res, next) => {
  const token = req.params?.token || req.cookies?.token;

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
