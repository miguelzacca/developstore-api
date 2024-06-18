"use strict";
export const homePage = (req, res) => {
    res.render("pages/index");
};
export const loginPage = (req, res) => {
    res.render("pages/auth", {
        login: true,
        jsFiles: ["/auth/login.mjs"],
    });
};
export const registerPage = (req, res) => {
    res.render("pages/auth", {
        login: false,
        jsFiles: ["/auth/register.mjs"],
    });
};
export const verifyEmailPage = (req, res) => {
    res.render("pages/verifyEmail");
};
