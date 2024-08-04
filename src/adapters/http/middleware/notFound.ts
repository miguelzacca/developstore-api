import { config } from '@config/config.js'
import { Controller } from '@types'

export const notFound: Controller = (req, res) => {
  res.redirect(`${config.env.ORIGIN_ADDR}`)
}
