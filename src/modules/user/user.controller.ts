import { HandleError } from '../../utils/handleError.js'
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { ChangePasswdBody } from './dto/changePasswdBody.dto.js'
import { isLoggedIn } from '../../guard/isLoggedIn.guard.js'
import { UserServices } from './user.service.js'
import { ConfigService } from '@nestjs/config'
import { ToggleFavoriteBody } from './dto/toggleFavoriteBody.dto.js'

@Controller('/user')
@UseGuards(isLoggedIn)
export class UserControllers {
  constructor(
    @Inject()
    private configService: ConfigService,
    @Inject()
    private userServices: UserServices,
  ) {}

  @Get('/')
  async getUser(@Req() req: Request) {
    try {
      const { token } = req.cookies
      const user = await this.userServices.getUser(token)
      return user
    } catch (err) {
      HandleError.http(err)
    }
  }

  @Patch('/change-passwd')
  async changePasswd(@Body() body: ChangePasswdBody, @Req() req: Request) {
    try {
      const { token } = req.cookies
      const { passwd } = body

      await this.userServices.changePasswd(token, passwd)

      return { msg: this.configService.get('userMsg.updated') }
    } catch (err) {
      HandleError.http(err)
    }
  }

  @Delete('/delete')
  async deleteUser(@Req() req: Request, @Res() res: Response) {
    try {
      const { token } = req.cookies

      await this.userServices.deleteUser(token)

      res.clearCookie('token')
      res.status(200).json({ msg: this.configService.get('userMsg.deleted') })
    } catch (err) {
      HandleError.http(err)
    }
  }

  @Post('/toggle-favorite')
  async toggleFavorite(@Body() body: ToggleFavoriteBody, @Req() req: Request) {
    try {
      const { token } = req.cookies
      const { productId } = body
      await this.userServices.toggleFavorite(token, productId)
    } catch (err) {
      HandleError.http(err)
    }
  }

  @Get('/get-favorites')
  async getFavorites(@Req() req: Request) {
    try {
      const { token } = req.cookies
      const favorites = await this.userServices.getFavorites(token)
      return favorites
    } catch (err) {
      HandleError.http(err)
    }
  }
}
