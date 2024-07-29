import { config } from '../../../config/config.js'
import { Controller } from '../../../types/global'

export const notFound: Controller = (req, res) => {
  res.redirect(`${config.env.ORIGIN_ADDR}`)
}
