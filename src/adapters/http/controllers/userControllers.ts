import { config } from '@config/config.js'
import { Controller } from '@types'
import { ChangePasswdDto } from '@adapters/dto/changePasswdBodyDto.js'
import { GetUserUseCase } from '@application/usecases/user/getUserUseCase.js'
import { ChangePasswdUseCase } from '@application/usecases/user/changePasswdUseCase.js'
import { DeleteUserUseCase } from '@application/usecases/user/deleteUserUseCase.js'
import { ToggleFavoriteUseCase } from '@application/usecases/user/toggleFavoriteUseCase.js'
import { GetFavoritesUseCase } from '@application/usecases/user/getFavoritesUseCase.js'
import { handleHttpErrorResponse } from '@utils/handleHttpErrorResponse.js'

export class UserControllers {
  constructor(
    private getUserUseCase: GetUserUseCase,
    private changePasswdUseCase: ChangePasswdUseCase,
    private deleteUserUseCase: DeleteUserUseCase,
    private toggleFavoriteUseCase: ToggleFavoriteUseCase,
    private getFavoritesUseCase: GetFavoritesUseCase,
  ) {}

  getUser: Controller = async (req, res) => {
    try {
      const { token } = req.cookies

      const user = await this.getUserUseCase.execute(token)

      res.status(200).json(user)
    } catch (err) {
      handleHttpErrorResponse(res, err)
    }
  }

  changePasswd: Controller = async (req, res) => {
    try {
      const { token } = req.cookies
      const { passwd } = new ChangePasswdDto(req.body)

      await this.changePasswdUseCase.execute(token, passwd)

      res.status(200).json({ msg: config.userMsg.updated })
    } catch (err) {
      handleHttpErrorResponse(res, err)
    }
  }

  public deleteUser: Controller = async (req, res) => {
    try {
      const { token } = req.cookies

      await this.deleteUserUseCase.execute(token)

      res.clearCookie('token')
      res.status(200).json({ msg: config.userMsg.deleted })
    } catch (err) {
      handleHttpErrorResponse(res, err)
    }
  }

  toggleFavorite: Controller = async (req, res) => {
    try {
      const { token } = req.cookies
      const { productId } = req.body

      await this.toggleFavoriteUseCase.execute(token, productId)

      res.sendStatus(200)
    } catch (err) {
      handleHttpErrorResponse(res, err)
    }
  }

  getFavorites: Controller = async (req, res) => {
    try {
      const { token } = req.cookies

      const favorites = await this.getFavoritesUseCase.execute(token)

      res.status(200).json(favorites)
    } catch (err) {
      handleHttpErrorResponse(res, err)
    }
  }
}
