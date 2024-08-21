import { UserRepository } from '../../user/user.repository.js'
import { Inject, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { CommonServices } from '../../common/common.service.js'
import { ConfigService } from '@nestjs/config'

interface RegisterUserCaseProps {
  uname: string
  passwd: string
  email: string
}

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject()
    private configService: ConfigService,
    @Inject()
    private userRepository: UserRepository,
    @Inject()
    private commonServices: CommonServices,
  ) {}

  async execute({ uname, passwd, email }: RegisterUserCaseProps) {
    const emailExists = await this.userRepository.findByField({ email })

    if (emailExists) {
      const msg = this.configService.get('authMsg.emailExists')
      throw { custom: { status: 409, msg } }
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPasswd = await bcrypt.hash(passwd, salt)

    await this.userRepository.create({
      uname,
      email,
      passwd: hashedPasswd,
    })

    const emailToken = jwt.sign(
      { email },
      this.configService.get('env.SECRET'),
      {
        expiresIn: '1h',
      },
    )

    const verifyLink = `${this.configService.get('env.API_ADDR')}/auth/email-verify/${emailToken}`

    this.commonServices.sendLink({
      to: email,
      subject: 'Email Verification Link',
      link: verifyLink,
    })
  }
}
