"use strict";
import bcrypt from "bcrypt";
import { z } from "zod";
import jwt from "jsonwebtoken";
import xss from "xss";
import User from "./models/User.js";
import config from "./config.js";
const inputDataSchema = z.object({
    name: z.string().min(3).max(100).optional(),
    email: z.string().max(100).email().optional(),
    passwd: z.string().min(6).max(16).optional(),
});
const objectKey = (obj) => {
    const key = Object.keys(obj)[0];
    return {
        key,
        value: obj[key],
    };
};
export const validateInput = (input) => {
    try {
        return inputDataSchema.parse(input);
    }
    catch (err) {
        throw { zod: err };
    }
};
export const findUserByField = async (field, restrict = false) => {
    const { key, value } = objectKey(field);
    let attributes = undefined;
    if (restrict) {
        attributes = { exclude: ["passwd"] };
    }
    return await User.findOne({ where: { [key]: value }, attributes });
};
export const sanitizeInput = (input) => {
    const sanitizedData = {};
    for (const key of Object.keys(input)) {
        sanitizedData[key] = xss(input[key]);
    }
    return sanitizedData;
};
export const updateUserField = async (user, field) => {
    const { key, value } = objectKey(field);
    if (key !== "passwd") {
        user[key] = value;
        return user;
    }
    const salt = await bcrypt.genSalt(12);
    user[key] = await bcrypt.hash(value, salt);
    return user;
};
export const jwtVerify = (token) => {
    try {
        const secret = config.env.SECRET;
        const payload = jwt.verify(token, secret);
        return payload.id;
    }
    catch (err) {
        throw err;
    }
};
