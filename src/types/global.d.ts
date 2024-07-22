import { Request, Response, NextFunction } from 'express'
import { Model, FindAttributeOptions } from 'sequelize'
import { Schema } from 'zod'

export type UserModel = Model & Record<string, any>

export type ProductModel = UserModel

export type FavoriteModel = UserModel   

export type ZodHandleSchema = Record<string, Schema>

export type Controller = (req: Request, res: Response) => void

export type ObjKey = Record<string, string>

export type FindAttributes = FindAttributeOptions | undefined

export type Middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void
