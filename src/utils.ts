import { config } from './config.js'
import { Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

export const jwtVerify = (token: string, payloadName?: string) => {
  const payload = jwt.verify(token, config.env.SECRET) as JwtPayload
  return payloadName && payload[payloadName]
}

export const handleError = (res: Response, err: any) => {
  if (err.zod) {
    return res.status(422).json(err)
  }

  if (err.custom) {
    const { status, msg } = err
    if (msg) {
      return res.status(status).json({ msg })
    }
    return res.sendStatus(status)
  }

  console.error(err)
  res.status(500).json({ msg: config.serverMsg.err })
}
