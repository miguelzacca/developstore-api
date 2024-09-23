import { RegisterBody } from './dto/registerBody.dto.js'
import { HandleError } from '../../utils/handleError.js'
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common'
import { LoginBody } from './dto/loginBody.dto.js'
import { Response } from 'express'
import { isLoggedIn } from '../../guard/isLoggedIn.guard.js'
import { AuthServices } from './auth.service.js'
import { ConfigService } from '@nestjs/config'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('auth')
@Controller('/auth')
export class AuthControllers {
  constructor(
    @Inject()
    private configService: ConfigService,
    @Inject()
    private authServices: AuthServices,
  ) {}

  @Get('/email-verify/:token')
  async emailVerify(@Param('token') token: string, @Res() res: Response) {
    try {
      await this.authServices.emailVerify(token)
      res
        .status(200)
        .redirect(`${this.configService.get('env.ORIGIN_ADDR')}/login`)
    } catch (err) {
      HandleError.http(err)
    }
  }

  @Post('/register')
  async register(@Body() body: RegisterBody) {
    try {
      await this.authServices.register(body)
      return { msg: this.configService.get('userMsg.created') }
    } catch (err) {
      HandleError.http(err)
    }
  }

  @Post('/login')
  async login(@Body() body: LoginBody, @Res() res: Response) {
    try {
      const authToken = await this.authServices.login(body)
      res.cookie('token', authToken, this.configService.get('cookie'))
      res.status(200).json({ msg: this.configService.get('authMsg.ok') })
    } catch (err) {
      HandleError.http(err)
    }
  }

  @Get('/passwd-recovery/:email')
  async passwdRecovery(@Param('email') email: string) {
    try {
      await this.authServices.passwdRecovery(email)
      return { msg: this.configService.get('authMsg.recoveryEmail') }
    } catch (err) {
      HandleError.http(err)
    }
  }

  @Get('/token-validator/:token')
  @UseGuards(isLoggedIn)
  async tokenValidator(
    @Param('token') token: string,
    @Query('setCookie') setCookie: string,
    @Res() res: Response,
  ) {
    if (setCookie) {
      res.cookie('token', token, this.configService.get('cookie'))
    }
    res.sendStatus(200)
  }
}
