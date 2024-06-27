"use strict";

import config from "../config.js";
import { IController } from "../types/global";

class ViewControllers {
  public homePage: IController = (req, res) => {
    res.render("pages/index");
  };

  public loginPage: IController = (req, res) => {
    res.render("pages/auth", {
      login: true,
      jsFiles: ["/auth/login.mjs"],
    });
  };

  public registerPage: IController = (req, res) => {
    res.render("pages/auth", {
      login: false,
      jsFiles: ["/auth/register.mjs"],
    });
  };

  public verifyEmailPage: IController = (req, res) => {
    res.render("pages/verifyEmail");
  };

  public accountPage: IController = (req, res) => {
    res.render("pages/account");
  };

  public changePasswdPage: IController = (req, res) => {
    const token = req.params?.token;

    if (!token) {
      return res.status(403).json({ msg: config.serverMsg.denied });
    }

    res.cookie("token", token, config.cookie);

    res.render("pages/auth", {
      login: true,
      jsFiles: ["/auth/changePasswd"],
    });
  };
}

export default new ViewControllers();
