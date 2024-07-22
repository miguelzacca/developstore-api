import { config } from '../config.js'
import { Controller, FavoriteModel } from '../types/global.js'
import { utils } from '../utils.js'
import { Favorites } from '../models/Favorites.js'
import { User } from '../models/User.js'
import { Products } from '../models/Products.js'

class UserControllers {
  public getUser: Controller = async (req, res) => {
    const { token } = req.cookies

    try {
      const id = utils.jwtVerify(token, 'id')

      if (!id) {
        throw { custom: true, status: 401, msg: config.serverMsg.invalidToken }
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

      user.save()

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

      user.destroy()

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

      user.save()

      res.status(200).json({ msg: config.userMsg.updated })
    } catch (err) {
      utils.handleError(res, err)
    }
  }

  public toggleFavorite: Controller = async (req, res) => {
    const { token } = req.cookies
    const { productId } = req.body

    try {
      const userId = utils.jwtVerify(token, 'id')

      if (!userId || !productId) {
        throw { custom: true, status: 422, msg: 'Missing IDs.' }
      }

      const isFavorite = await Favorites.findOne({ where: { productId } })

      if (isFavorite) {
        Favorites.destroy({ where: { productId } })
        return res.sendStatus(200)
      }

      Favorites.create({ userId, productId })
      res.sendStatus(200)
    } catch (err) {
      utils.handleError(res, err)
    }
  }

  public getFavorite: Controller = async (req, res) => {
    const { token } = req.cookies

    try {
      const id = utils.jwtVerify(token, 'id')

      const data = (await User.findOne({
        where: { id },
        include: [
          {
            model: Products,
            as: 'favorites',
            through: { attributes: [] },
          },
        ],
      })) as FavoriteModel

      const favorites = data['favorites']

      res.status(200).json(favorites)
    } catch (err) {
      utils.handleError(res, err)
    }
  }
}

export const userControllers = new UserControllers()
