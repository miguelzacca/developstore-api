import { CommonServices } from '../common/common.service.js'
import { LoginBody } from './dto/loginBody.dto.js'
import { RegisterBody } from './dto/registerBody.dto.js'
import { EmailVerifyUseCase } from './usecases/emailVerify.usecase.js'
import { LoginUseCase } from './usecases/login.usecase.js'
import { PasswdRecoveryUseCase } from './usecases/passwdRecovery.usecase.js'
import { RegisterUseCase } from './usecases/register.usecase.js'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class AuthServices {
  constructor(
    @Inject()
    private commonServices: CommonServices,
    @Inject()
    private emailVerifyUseCase: EmailVerifyUseCase,
    @Inject()
    private registerUseCase: RegisterUseCase,
    @Inject()
    private loginUseCase: LoginUseCase,
    @Inject()
    private passwdRecoveryUseCase: PasswdRecoveryUseCase,
  ) {}

  async emailVerify(emailToken: string) {
    const email = this.commonServices.extractJwtPayload(emailToken, 'email')
    return this.emailVerifyUseCase.execute(email)
  }

  async register(data: RegisterBody) {
    return this.registerUseCase.execute(data)
  }

  async login(data: LoginBody) {
    return this.loginUseCase.execute(data)
  }

  async passwdRecovery(email: string) {
    return this.passwdRecoveryUseCase.execute(email)
  }
}
