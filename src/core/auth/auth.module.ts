import { Module } from '@nestjs/common'
import { AuthControllers } from './auth.controller.js'
import { AuthServices } from './auth.service.js'
import { EmailVerifyUseCase } from './usecases/emailVerify.usecase.js'
import { LoginUseCase } from './usecases/login.usecase.js'
import { PasswdRecoveryUseCase } from './usecases/passwdRecovery.usecase.js'
import { RegisterUseCase } from './usecases/register.usecase.js'
import { UserModule } from '../user/user.module.js'
import { CommonModule } from '../common/common.module.js'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [UserModule, CommonModule, ConfigModule],
  controllers: [AuthControllers],
  providers: [
    AuthServices,
    EmailVerifyUseCase,
    LoginUseCase,
    PasswdRecoveryUseCase,
    RegisterUseCase,
  ],
})
export class AuthModule {}
