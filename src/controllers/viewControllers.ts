"use strict";

import { Request, Response } from "express";

export const homePage = (req: Request, res: Response) => {
  res.render("pages/index");
};

export const loginPage = (req: Request, res: Response) => {
  res.render("pages/login", { login: true });
};

export const registerPage = (req: Request, res: Response) => {
  res.render("pages/login", { login: false });
};
