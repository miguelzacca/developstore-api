import { config } from '@config/config.js'
import { Controller } from '@types'
import { RegisterBodyDto } from '@adapters/dto/registerBodyDto.js'
import { handleHttpErrorResponse } from '@src/utils/handleHttpErrorResponse.js'
import { EmailVerifyUseCase } from '@application/usecases/auth/emailVerifyUseCase.js'
import { RegisterUseCase } from '@application/usecases/auth/registerUserCase.js'
import { LoginUseCase } from '@application/usecases/auth/loginUseCase.js'
import { PasswdRecoveryUseCase } from '@application/usecases/auth/passwdRecoveryUseCase.js'

export class AuthControllers {
  constructor(
    private emailVerifyUseCase: EmailVerifyUseCase,
    private registerUseCase: RegisterUseCase,
    private loginUseCase: LoginUseCase,
    private passwdRecoveryUseCase: PasswdRecoveryUseCase,
  ) {}

  emailVerify: Controller = async (req, res) => {
    try {
      const { token } = req.params

      await this.emailVerifyUseCase.execute(token)

      res.status(200).redirect(`${config.env.ORIGIN_ADDR}/login`)
    } catch (err) {
      handleHttpErrorResponse(res, err)
    }
  }

  register: Controller = async (req, res) => {
    try {
      const validatedBody = new RegisterBodyDto(req.body)

      await this.registerUseCase.execute(validatedBody)

      res.status(201).json({ msg: config.userMsg.created })
    } catch (err) {
      handleHttpErrorResponse(res, err)
    }
  }

  login: Controller = async (req, res) => {
    try {
      const authToken = await this.loginUseCase.execute(req.body)

      res.cookie('token', authToken, config.cookie)

      res.status(200).json({ msg: config.authMsg.ok })
    } catch (err) {
      handleHttpErrorResponse(res, err)
    }
  }

  passwdRecovery: Controller = async (req, res) => {
    try {
      const { email } = req.params

      await this.passwdRecoveryUseCase.execute({ email })

      res.status(200).json({ msg: config.authMsg.recoveryEmail })
    } catch (err) {
      handleHttpErrorResponse(res, err)
    }
  }

  tokenValidator: Controller = (req, res) => {
    const { token } = req.params
    const { setCookie } = req.query

    if (setCookie) {
      res.cookie('token', token, config.cookie)
    }

    res.sendStatus(200)
  }
}
