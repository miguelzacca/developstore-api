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
  IUserModel,
  IZodHandleSchema,
} from "./types/global";
import { Response } from "express";

class Utils {
  private _registerSchema = z.object({
    name: z.string().min(3).max(100),
    email: z.string().max(100).email(),
    passwd: z.string().min(6).max(16),
  });

  private _patchSchema = z.object({
    name: z.string().min(3).max(100),
  });

  private _changePasswdSchema = z.object({
    passwd: z.string().min(3).max(100),
  });

  private _objectKey = (obj: IObjKey) => {
    const key = Object.keys(obj)[0];
    return {
      key,
      value: obj[key],
    };
  };

  public validateInput = (input: object, schema: string) => {
    try {
      const handleSchema: IZodHandleSchema = {
        register: this._registerSchema,
        patch: this._patchSchema,
        changePasswd: this._changePasswdSchema,
      };
      return handleSchema[schema].parse(input);
    } catch (err) {
      throw { zod: err };
    }
  };

  public findUserByField = async (field: IObjKey, restrict = false) => {
    const { key, value } = this._objectKey(field);

    let attributes: FindAttributes = undefined;
    if (restrict) {
      attributes = { exclude: ["id", "passwd"] };
    }

    const user = (await User.findOne({
      where: { [key]: value },
      attributes,
    })) as IUserModel;

    return user;
  };

  public sanitizeInput = (input: IObjKey) => {
    const sanitizedData: IObjKey = {};
    for (const key of Object.keys(input)) {
      sanitizedData[key] = xss(input[key]);
    }
    return sanitizedData;
  };

  public updateUserField = async (user: IUserModel, field: IObjKey) => {
    const { key, value } = this._objectKey(field);

    if (key !== "passwd") {
      user[key] = value;
      return user;
    }

    const salt = await bcrypt.genSalt(12);
    user[key] = await bcrypt.hash(value, salt);

    return user;
  };

  public jwtVerify = (token: string, payloadName?: string) => {
    try {
      const payload = jwt.verify(token, config.env.SECRET) as JwtPayload;
      return payloadName && payload[payloadName];
    } catch (err) {
      throw err;
    }
  };

  public handleError = (res: Response, err: any) => {
    if (err.zod) {
      return res.status(422).json(err);
    }
    console.error(err);
    res.status(500).json({ msg: config.serverMsg.err });
  };
}

export default new Utils();
