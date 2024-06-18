"use strict";

import { Request, Response } from "express";

export const homePage = (req: Request, res: Response) => {
  res.render("pages/index");
};

export const loginPage = (req: Request, res: Response) => {
  res.render("pages/auth", {
    login: true,
    jsFiles: ["/auth/login.mjs"],
  });
};

export const registerPage = (req: Request, res: Response) => {
  res.render("pages/auth", {
    login: false,
    jsFiles: ["/auth/register.mjs"],
  });
};

export const verifyEmailPage = (req: Request, res: Response) => {
  res.render("pages/verifyEmail");
};
