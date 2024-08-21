import { LoginBody } from '../dto/loginBody.dto.js'
import { UserRepository } from '../../user/user.repository.js'
import { Inject, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject()
    private configService: ConfigService,
    @Inject()
    private userRepository: UserRepository,
  ) {}

  async execute({ email, passwd }: LoginBody) {
    const user = await this.userRepository.findByField({ email })

    if (!user) {
      const msg = this.configService.get('userMsg.notFound')
      throw { custom: { status: 404, msg } }
    }

    if (!user.verified_email) {
      const msg = this.configService.get('authMsg.noVerifiedEmail')
      throw { custom: { status: 400, msg } }
    }

    const checkPasswd = await bcrypt.compare(passwd, user.passwd)

    if (!checkPasswd) {
      const msg = this.configService.get('authMsg.incorrect')
      throw { custom: { status: 422, msg } }
    }

    const token = jwt.sign(
      { id: user.id },
      this.configService.get('env.SECRET'),
      {
        expiresIn: `${this.configService.get('env.AUTH_DURATION_DAYS') * 24}h`,
      },
    )

    return token
  }
}
