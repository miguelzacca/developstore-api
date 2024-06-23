"use strict";

import { IController } from "../types/global";

export const homePage: IController = (req, res) => {
  res.render("pages/index");
};

export const loginPage: IController = (req, res) => {
  res.render("pages/auth", {
    login: true,
    jsFiles: ["/auth/login.mjs"],
  });
};

export const registerPage: IController = (req, res) => {
  res.render("pages/auth", {
    login: false,
    jsFiles: ["/auth/register.mjs"],
  });
};

export const verifyEmailPage: IController = (req, res) => {
  res.render("pages/verifyEmail");
};

export const accountPage: IController = (req, res) => {
  res.render("pages/account");
};
