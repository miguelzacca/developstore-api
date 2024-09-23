import { UserRepository } from '../../user/user.repository.js'
import { Inject, Injectable } from '@nestjs/common'
import jwt from 'jsonwebtoken'
import { CommonServices } from '../../common/common.service.js'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class PasswdRecoveryUseCase {
  constructor(
    @Inject()
    private configService: ConfigService,
    @Inject()
    private userRepository: UserRepository,
    @Inject()
    private commonServices: CommonServices,
  ) {}

  async execute(email: string) {
    const userExists = await this.userRepository.findByField({ email })

    if (!userExists) {
      const msg = this.configService.get('userMsg.notFound')
      throw { custom: { status: 404, msg } }
    }

    const recoveryToken = jwt.sign(
      { email },
      this.configService.get('env.SECRET'),
      {
        expiresIn: '1h',
      },
    )

    const recoveryLink = `${this.configService.get('env.ORIGIN_ADDR')}/passwd-change/${recoveryToken}`

    this.commonServices.sendLink({
      to: email,
      subject: 'Password Recovery',
      link: recoveryLink,
    })
  }
}
