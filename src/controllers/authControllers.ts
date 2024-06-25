"use strict";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import config from "../config.js";
import {
  sanitizeInput,
  validateInput,
  findUserByField,
  jwtVerify,
} from "../utils.js";
import { IObjKey, IController } from "../types/global.js";

export const emailVerify: IController = async (req, res) => {
  const emailToken = req.params?.token;

  if (!emailToken) {
    return res.status(400).json({ msg: config.authMsg.noEmailToken });
  }

  try {
    const email = jwtVerify(emailToken, "email");

    const user = await findUserByField({ email });

    if (!user) {
      return res.status(400).json({ msg: config.serverMsg.invalidToken });
    }

    if (user["verifiedEmail"]) {
      return res
        .status(400)
        .json({ msg: config.authMsg.emailAlreadyVerified });
    }

    user["verifiedEmail"] = true;
    await user.save();

    res.status(200).redirect(`${config.env.HOST}/login`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: config.serverMsg.err });
  }
};

export const register: IController = async (req, res) => {
  try {
    const sanitizedInput = sanitizeInput(req.body);
    const input: IObjKey = validateInput(sanitizedInput, "register");
    const { name, email, passwd } = input;

    const emailExists = await findUserByField({ email });

    if (emailExists) {
      return res.status(409).json({ msg: config.authMsg.emailExists });
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

    const verifyLink = `${config.env.HOST}/auth/email-verify/${emailToken}`;

    config.transporter.sendMail({
      from: "Develop Store",
      to: email,
      subject: "Email Verification Link",
      html: `<h3 style="font-weight: 400">${verifyLink}</h3>`,
    });

    res.status(201).json({ msg: config.userMsg.created });
  } catch (err: any) {
    if (err.zod) {
      return res.status(422).json(err);
    }
    console.error(err);
    res.status(500).json({ msg: config.serverMsg.err });
  }
};

export const login: IController = async (req, res) => {
  try {
    const sanitizedInput = sanitizeInput(req.body);
    const input: IObjKey = sanitizedInput;
    const { email, passwd } = input;

    const user = await findUserByField({ email });

    if (!user) {
      return res.status(404).json({ msg: config.userMsg.notFound });
    }

    if (!user["verifiedEmail"]) {
      return res.status(400).json({ msg: config.authMsg.noVerifiedEmail });
    }

    const checkPasswd = await bcrypt.compare(passwd, user.passwd);

    if (!checkPasswd) {
      return res.status(422).json({ msg: config.authMsg.incorrect });
    }

    const token = jwt.sign({ id: user.id }, config.env.SECRET, {
      expiresIn: config.env.AUTH_DURATION_DAYS * 24 * 60 * 60,
    });

    res.cookie("token", token, config.cookie);

    res.status(200).json({ msg: config.authMsg.ok });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: config.serverMsg.err });
  }
};
