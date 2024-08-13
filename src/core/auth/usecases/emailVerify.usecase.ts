import { ConfigService } from '@nestjs/config'
import { UserRepository } from '../../user/user.repository.js'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class EmailVerifyUseCase {
  constructor(
    @Inject()
    private configService: ConfigService,
    @Inject()
    private userRepository: UserRepository,
  ) {}

  async execute(email: string) {
    const user = await this.userRepository.findByField({ email })

    if (!user) {
      const msg = this.configService.get('serverMsg.invalidToken')
      throw { custom: { status: 400, msg } }
    }

    if (user.verified_email) {
      return
    }

    user.verified_email = true
    await this.userRepository.save(user)
  }
}
