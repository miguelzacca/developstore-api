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
    const token = req.params.token;
    res.cookie("token", token, config.cookie);

    res.render("pages/changePasswd", {
      request: false,
      jsFiles: ["/user/changePasswd.mjs"],
    });
  };

  public requestToChangePasswdPage: IController = (req, res) => {
    res.render("pages/changePasswd", {
      request: true,
      jsFiles: ["/auth/passwdRecovery.mjs"],
    });
  };
}

export default new ViewControllers();
