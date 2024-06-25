"use strict";

import config from "../config.js";
import { IObjKey, IController } from "../types/global.js";
import {
  sanitizeInput,
  validateInput,
  findUserByField,
  updateUserField,
  jwtVerify,
} from "../utils.js";

export const getUser: IController = async (req, res) => {
  const token = req.cookies.token;
  const id = jwtVerify(token, "id");

  try {
    const user = await findUserByField({ id }, true);

    if (!user) {
      return res.status(404).json({ msg: config.userMsg.notFound });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: config.serverMsg.err });
  }
};

export const patchUser: IController = async (req, res) => {
  const token = req.cookies.token;
  const id = jwtVerify(token, "id");

  try {
    const sanitizedInput = sanitizeInput(req.body);
    const input: IObjKey = validateInput(sanitizedInput, "patch");

    console.log(req.body);

    let user = await findUserByField({ id });

    if (!user) {
      return res.status(404).json({ msg: config.userMsg.notFound });
    }

    for (const key in input) {
      user = await updateUserField(user, { [key]: input[key] });
    }

    await user.save();

    res.status(200).json({ msg: config.userMsg.updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: config.serverMsg.err });
  }
};

export const deleteUser: IController = async (req, res) => {
  const token = req.cookies.token;
  const id = jwtVerify(token, "id");

  try {
    const user = await findUserByField({ id });

    if (!user) {
      return res.status(404).json({ msg: config.userMsg.notFound });
    }

    await user.destroy();

    res.clearCookie("token");

    res.status(200).json({ msg: config.userMsg.deleted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: config.serverMsg.err });
  }
};
