import { IMiddleware } from "../types/global.js";
import utils from "../utils.js";

export const pendingEmail: IMiddleware = async (req, res, next) => {
  const email = req.params?.email;

  try {
    if (!email) {
      return res.status(403).redirect("/");
    }

    const user = await utils.findUserByField({ email });

    if (!user["verifiedEmail"]) {
      return next();
    }

    res.status(403).redirect("/");
  } catch (err) {
    utils.handleError(res, err);
  }
};
