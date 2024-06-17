"use strict";
export const homePage = (req, res) => {
    res.render("pages/index");
};
export const loginPage = (req, res) => {
    res.render("pages/login", { login: true });
};
export const registerPage = (req, res) => {
    res.render("pages/login", { login: false });
};
