import { config } from '../config.js'
import { Controller } from '../types/global.js'
import { utils } from '../utils.js'

class UserControllers {
  public getUser: Controller = async (req, res) => {
    const { token } = req.cookies

    try {
      const id = utils.jwtVerify(token, 'id')

      if (!id) {
        throw { status: 401, msg: config.serverMsg.invalidToken }
      }

      const user = await utils.findUserByField({ id }, true)

      if (!user) {
        return res.status(404).json({ msg: config.userMsg.notFound })
      }

      res.status(200).json(user)
    } catch (err) {
      utils.handleError(res, err)
    }
  }

  public patchUser: Controller = async (req, res) => {
    const { token } = req.cookies

    try {
      const id = utils.jwtVerify(token, 'id')

      const sanitizedInput = utils.sanitizeInput(req.body)
      const input = utils.validateInput(sanitizedInput, 'patch')

      let user = await utils.findUserByField({ id })

      if (!user) {
        return res.status(404).json({ msg: config.userMsg.notFound })
      }

      user = await utils.updateUserField(user, input)

      await user.save()

      res.status(200).json({ msg: config.userMsg.updated })
    } catch (err) {
      utils.handleError(res, err)
    }
  }

  public deleteUser: Controller = async (req, res) => {
    const { token } = req.cookies

    try {
      const id = utils.jwtVerify(token, 'id')

      const user = await utils.findUserByField({ id })

      if (!user) {
        return res.status(404).json({ msg: config.userMsg.notFound })
      }

      await user.destroy()

      res.clearCookie('token')

      res.status(200).json({ msg: config.userMsg.deleted })
    } catch (err) {
      utils.handleError(res, err)
    }
  }

  public changePasswd: Controller = async (req, res) => {
    const { token } = req.cookies

    try {
      const email = utils.jwtVerify(token, 'email')
      const { passwd } = utils.validateInput(req.body, 'changePasswd')

      let user = await utils.findUserByField({ email })

      if (!user) {
        return res.status(404).json({ msg: config.userMsg.notFound })
      }

      user = await utils.updateUserField(user, { passwd })

      await user.save()

      res.status(200).json({ msg: config.userMsg.updated })
    } catch (err) {
      utils.handleError(res, err)
    }
  }
}

export const userControllers = new UserControllers()
