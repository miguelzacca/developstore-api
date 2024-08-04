import { config } from '../config/config.js'
import { Response } from 'express'

export const handleHttpErrorResponse = (res: Response, err: any) => {
  if (err.zod) {
    return res.status(422).json(err)
  }

  if (err.custom) {
    const { custom } = err
    return res.status(custom.status).json({ msg: custom.msg })
  }

  console.error(err)
  res.status(500).json({ msg: config.serverMsg.err })
}
