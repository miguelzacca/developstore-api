import { Middleware } from '../../../types/global'
import * as utils from '../../../utils.js'

export const isLoggedIn: Middleware = (req, res, next) => {
  const token = req.params?.token || req.cookies?.token

  if (!token) {
    return res.sendStatus(403)
  }

  try {
    utils.jwtVerify(token)
    next()
  } catch (err) {
    res.sendStatus(401)
  }
}
