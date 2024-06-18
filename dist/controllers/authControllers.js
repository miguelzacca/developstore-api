"use strict";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import config from "../config.js";
import { sanitizeInput, validateInput, findUserByField } from "../utils.js";
export const emailVerify = async (req, res) => {
    const emailToken = req.params?.token;
    if (!emailToken) {
        return res.status(400).json({ msg: config.msg.auth.noEmailToken });
    }
    try {
        const decoded = jwt.verify(emailToken, config.env.SECRET);
        const { email } = decoded;
        const user = await findUserByField({ email });
        if (!user) {
            return res.status(400).json({ msg: config.msg.server.invalidToken });
        }
        if (user["verifiedEmail"]) {
            return res
                .status(400)
                .json({ msg: config.msg.auth.emailAlreadyVerified });
        }
        user["verifiedEmail"] = true;
        await user.save();
        res.status(200).redirect("http://127.0.0.1:8000/login");
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: config.msg.server.err });
    }
};
export const register = async (req, res) => {
    try {
        const sanitizedInput = sanitizeInput(req.body);
        const input = validateInput(sanitizedInput);
        const { name, email, passwd } = input;
        const emailExists = await findUserByField({ email });
        if (emailExists) {
            return res.status(409).json({ msg: config.msg.auth.emailExists });
        }
        const salt = await bcrypt.genSalt(12);
        const passwdHash = await bcrypt.hash(passwd, salt);
        await User.create({
            name,
            email,
            passwd: passwdHash,
        });
        const emailToken = jwt.sign({ email }, config.env.SECRET, {
            expiresIn: "1h",
        });
        config.transporter.sendMail({
            from: "Develop Store",
            to: email,
            subject: "Email Verification Link",
            html: `<h3 style="font-weight: 400">http://127.0.0.1:8000/auth/email-verify/${emailToken}</h3>`,
        });
        res.status(201).json({ msg: config.msg.user.created });
    }
    catch (err) {
        if (err.zod) {
            return res.status(422).json(err);
        }
        console.error(err);
        res.status(500).json({ msg: config.msg.server.err });
    }
};
export const login = async (req, res) => {
    try {
        const sanitizedInput = sanitizeInput(req.body);
        const input = sanitizedInput;
        const { email, passwd } = input;
        const user = await findUserByField({ email });
        if (!user) {
            return res.status(404).json({ msg: config.msg.user.notFound });
        }
        if (!user["verifiedEmail"]) {
            return res.status(400).json({ msg: config.msg.auth.noVerifiedEmail });
        }
        const checkPasswd = await bcrypt.compare(passwd, user.passwd);
        if (!checkPasswd) {
            return res.status(422).json({ msg: config.msg.auth.incorrect });
        }
        const secret = config.env.SECRET;
        const token = jwt.sign({ id: user.id }, secret, {
            expiresIn: config.env.AUTH_DURATION_DAYS * 24 * 60 * 60,
        });
        res.cookie("token", token, config.cookie);
        res.status(200).json({ msg: config.msg.auth.ok });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: config.msg.server.err });
    }
};
