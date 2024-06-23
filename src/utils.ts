"use strict";

import bcrypt from "bcrypt";
import { z } from "zod";
import jwt, { JwtPayload } from "jsonwebtoken";
import xss from "xss";
import User from "./models/User.js";
import config from "./config.js";
import {
  FindAttributes,
  IObjKey,
  IZodHandleSchema,
  UserModel,
} from "./types/global.js";

const registerSchema = z.object({
  name: z.string().min(3).max(100),
  email: z.string().max(100).email(),
  passwd: z.string().min(6).max(16),
});

const patchSchema = z.object({
  name: z.string().min(3).max(100),
});

const objectKey = (obj: IObjKey) => {
  const key = Object.keys(obj)[0];
  return {
    key,
    value: obj[key],
  };
};

export const validateInput = (input: object, schema: string) => {
  try {
    const handleSchema: IZodHandleSchema = {
      register: registerSchema,
      patch: patchSchema,
    };
    return handleSchema[schema].parse(input);
  } catch (err) {
    throw { zod: err };
  }
};

export const findUserByField = async (field: IObjKey, restrict = false) => {
  const { key, value } = objectKey(field);

  let attributes: FindAttributes = undefined;
  if (restrict) {
    attributes = { exclude: ["id", "passwd"] };
  }

  return await User.findOne({ where: { [key]: value }, attributes });
};

export const sanitizeInput = (input: IObjKey) => {
  const sanitizedData: IObjKey = {};
  for (const key of Object.keys(input)) {
    sanitizedData[key] = xss(input[key]);
  }
  return sanitizedData;
};

export const updateUserField = async (user: UserModel, field: IObjKey) => {
  const { key, value } = objectKey(field);

  if (key !== "passwd") {
    user[key] = value;
    return user;
  }

  const salt = await bcrypt.genSalt(12);
  user[key] = await bcrypt.hash(value, salt);

  return user;
};

export const jwtVerify = (token: string, payloadName?: string) => {
  try {
    const payload = <JwtPayload>jwt.verify(token, config.env.SECRET);
    return payloadName && payload[payloadName];
  } catch (err) {
    throw err;
  }
};
