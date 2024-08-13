import { ConfigService } from '@nestjs/config'
import { UserRepository } from '../user.repository.js'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class ChangePasswdUseCase {
  constructor(
    @Inject()
    private configService: ConfigService,
    @Inject()
    private userRepository: UserRepository,
  ) {}

  async execute(email: string, newPasswd: string) {
    const user = await this.userRepository.findByField({ email })

    if (!user) {
      const msg = this.configService.get('userMsg.deleted')
      throw { custom: { status: 404, msg } }
    }

    await this.userRepository.changePasswd(user.id, newPasswd)
  }
}
