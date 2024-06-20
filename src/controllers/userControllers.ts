"use strict";

import config from "../config.js";
import { Response, Request } from "express";
import { InputData } from "../types/types.js";
import {
  sanitizeInput,
  validateInput,
  findUserByField,
  updateUserField,
  jwtVerify,
} from "../utils.js";

export const getUser = async (req: Request, res: Response) => {
  const token = req.cookies.token;
  const id = jwtVerify(token);

  try {
    const user = await findUserByField({ id }, true);

    if (!user) {
      return res.status(404).json({ msg: config.msg.user.notFound });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: config.msg.server.err });
  }
};

export const putUser = async (req: Request, res: Response) => {
  const token = req.cookies.token;
  const id = jwtVerify(token);

  try {
    const sanitizedInput = sanitizeInput(req.body);
    const input: InputData = validateInput(sanitizedInput);

    console.log(req.body);

    let user = await findUserByField({ id });

    if (!user) {
      return res.status(404).json({ msg: config.msg.user.notFound });
    }

    for (const key in input) {
      user = await updateUserField(user, { [key]: input[key] });
    }

    await user.save();

    res.status(200).json({ msg: config.msg.user.updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: config.msg.server.err });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const token = req.cookies.token;
  const id = jwtVerify(token);

  try {
    const user = await findUserByField({ id });

    if (!user) {
      return res.status(404).json({ msg: config.msg.user.notFound });
    }

    await user.destroy();

    res.clearCookie("token");

    res.status(200).json({ msg: config.msg.user.deleted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: config.msg.server.err });
  }
};
