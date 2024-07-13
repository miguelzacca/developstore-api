import * as bcrypt from 'bcrypt'
import { z } from 'zod'
import jwt, { JwtPayload } from 'jsonwebtoken'
import xss from 'xss'
import { User } from './models/User.js'
import { config } from './config.js'
import { Response } from 'express'
import {
  FindAttributes,
  UserModel,
  ZodHandleSchema,
  ObjKey,
} from './types/global'

interface SendEmailProps {
  to: string
  subject: string
  link: string
}

class Utils {
  private changePasswdSchema = z.object({
    passwd: z.string().min(6).max(16),
  })

  private registerSchema = this.changePasswdSchema.extend({
    name: z.string().min(3).max(100),
    email: z.string().max(100).email(),
  })

  private patchSchema = this.registerSchema.partial()

  private envSchema = z.object({
    NODE_ENV: z.enum(['production', 'development']),
    PORT: z.coerce.number().min(3000),
    ORIGIN_HOST: z.string().url(),
    API_HOST: z.string().url(),
    SMTP_USER: z.string().email(),
    SMTP_PASS: z.string().length(19),
    AUTH_DURATION_DAYS: z.coerce.number().min(1),
    SECRET: z.string().min(64),
  })

  private objectKey = (obj: ObjKey) => {
    const key = Object.keys(obj)[0]
    return {
      key,
      value: obj[key],
    }
  }

  private handleZodError = (err: any) => {
    const dir = err.issues[0]
    return `${dir.path}: ${dir.message}`
  }

  public validateInput = (input: object, schema: string) => {
    try {
      const handleSchema: ZodHandleSchema = {
        register: this.registerSchema,
        patch: this.patchSchema,
        changePasswd: this.changePasswdSchema,
        env: this.envSchema,
      }
      return handleSchema[schema].parse(input)
    } catch (err) {
      throw { zod: this.handleZodError(err) }
    }
  }

  public findUserByField = async (field: ObjKey, restrict = false) => {
    const { key, value } = this.objectKey(field)

    let attributes: FindAttributes = undefined
    if (restrict) {
      attributes = { exclude: ['id', 'passwd'] }
    }

    const user = (await User.findOne({
      where: { [key]: value },
      attributes,
    })) as UserModel

    return user
  }

  public sanitizeInput = (input: ObjKey) => {
    const sanitizedData: ObjKey = {}
    for (const key of Object.keys(input)) {
      sanitizedData[key] = xss(input[key])
    }
    return sanitizedData
  }

  public updateUserField = async (user: UserModel, fields: ObjKey) => {
    for (const key in fields) {
      if (key !== 'passwd') {
        user[key] = fields[key]
        continue
      }

      const salt = await bcrypt.genSalt(12)
      user[key] = await bcrypt.hash(fields[key], salt)
    }
    return user
  }

  public jwtVerify = (token: string, payloadName?: string) => {
    try {
      const payload = jwt.verify(token, config.env.SECRET) as JwtPayload
      return payloadName && payload[payloadName]
    } catch (err) {
      throw { custom: true, status: 401, msg: config.serverMsg.invalidToken }
    }
  }

  public handleError = (res: Response, err: any) => {
    if (err.zod) {
      return res.status(422).json(err)
    }

    if (err.custom) {
      const { status, msg } = err
      return res.status(status).json({ msg })
    }

    console.error(err)
    res.status(500).json({ msg: config.serverMsg.err })
  }

  public sendEmail = async ({ to, subject, link }: SendEmailProps) => {
    await config.transporter.sendMail({
      from: 'Develop Store',
      to,
      subject,
      html: `<h3 style="font-weight: 400">${link}</h3>`,
    })
  }
}

export const utils = new Utils()
