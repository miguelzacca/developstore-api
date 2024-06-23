"use strict";

import { IMiddleware } from "../types/global";

export const notFound: IMiddleware = (req, res, next) => {
  res.status(404).redirect("/");
};
