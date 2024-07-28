import { config } from '../../../config.js'
import { Controller } from '../../../types/global.js'
import * as utils from '../../../utils.js'
import { ChangePasswdDTO } from '../../dto/changePasswdBody.js'
import { UserRepository } from '../../repositories/userRepository.js'

export class UserControllers {
  constructor(private userRepository: UserRepository) {}

  getUser: Controller = async (req, res) => {
    const { token } = req.cookies

    try {
      const id = utils.jwtVerify(token, 'id')

      if (!id) {
        return res.status(401).json({ msg: config.serverMsg.invalidToken })
      }

      const user = await this.userRepository.findByField({ id }, true)

      if (!user) {
        return res.status(404).json({ msg: config.userMsg.notFound })
      }

      res.status(200).json(user)
    } catch (err) {
      utils.handleError(res, err)
    }
  }

  changePasswd: Controller = async (req, res) => {
    try {
      const { token } = req.cookies
      const email = utils.jwtVerify(token, 'email')

      const { passwd } = new ChangePasswdDTO(req.body)

      const user = await this.userRepository.findByField({ email })

      if (!user) {
        return res.status(404).json({ msg: config.userMsg.notFound })
      }

      await this.userRepository.changePasswd(user.id, passwd)
      await this.userRepository.save(user)

      res.status(200).json({ msg: config.userMsg.updated })
    } catch (err) {
      utils.handleError(res, err)
    }
  }

  public deleteUser: Controller = async (req, res) => {
    try {
      const { token } = req.cookies

      const id = utils.jwtVerify(token, 'id')

      const user = await this.userRepository.findByField({ id })

      if (!user) {
        return res.status(404).json({ msg: config.userMsg.notFound })
      }

      await this.userRepository.delete(user)

      res.clearCookie('token')
      res.status(200).json({ msg: config.userMsg.deleted })
    } catch (err) {
      utils.handleError(res, err)
    }
  }

  toggleFavorite: Controller = async (req, res) => {
    try {
      const { token } = req.cookies
      const { productId } = req.body

      const userId = utils.jwtVerify(token, 'id')

      await this.userRepository.toggleFavorite(userId, productId)
      res.sendStatus(200)
    } catch (err) {
      utils.handleError(res, err)
    }
  }

  getFavorites: Controller = async (req, res) => {
    const { token } = req.cookies

    try {
      const id = utils.jwtVerify(token, 'id')

      const favorites = await this.userRepository.getFavorites(id)

      res.status(200).json(favorites)
    } catch (err) {
      utils.handleError(res, err)
    }
  }
}
