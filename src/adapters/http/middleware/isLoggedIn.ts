import { config } from '../../../config/config.js'
import { Middleware } from '../../../types/global'
import jwt from 'jsonwebtoken'

export const isLoggedIn: Middleware = (req, res, next) => {
  const token = req.params?.token || req.cookies?.token

  if (!token) {
    return res.sendStatus(403)
  }

  try {
    jwt.verify(token, config.env.SECRET)
    next()
  } catch (err) {
    res.sendStatus(401)
  }
}
