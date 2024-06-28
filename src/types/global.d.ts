"use strict";

import { Request, Response, NextFunction } from "express";
import { Secret } from "jsonwebtoken";
import { Model, FindAttributeOptions } from "sequelize";
import { Schema, ZodError } from "zod";

interface IUserModel extends Model {
  [key: string]: any;
}

export interface IEnv {
  [key: string]: any;
}

export interface IZodHandleSchema {
  [key: string]: Schema;
}

export interface IController {
  (req: Request, res: Response): void;
}

export interface IObjKey {
  [key: string]: string;
}

export interface IMiddleware {
  (req: Request, res: Response, next: NextFunction): void;
}

export interface IObjFromFormData {
  [key: string]: FormDataEntryValue;
}

export type FindAttributes = FindAttributeOptions | undefined;
