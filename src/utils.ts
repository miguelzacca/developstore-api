import { z } from 'zod'
import { config } from './config/config.js'
import { Response } from 'express'

interface ValidatorOptions {
  data: object
  schema: z.Schema
}

export const handleError = (res: Response, err: any) => {
  if (err.zod) {
    return res.status(422).json(err)
  }
  console.error(err)
  res.status(500).json({ msg: config.serverMsg.err })
}

export const zodValidator = ({ data, schema }: ValidatorOptions) => {
  try {
    return schema.parse(data)
  } catch (err: any) {
    const { path, message } = err.issues[0]
    throw { zod: `${path}: ${message}` }
  }
}
