import { ConfigService } from '@nestjs/config'
import { UserRepository } from '../user.repository.js'
import { Inject, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

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
      const msg = this.configService.get('userMsg.notFound')
      throw { custom: { status: 404, msg } }
    }

    const salt = await bcrypt.genSalt(10)
    const hashedNewPasswd = await bcrypt.hash(newPasswd, salt)

    await this.userRepository.updateField({
      user,
      fieldName: 'passwd',
      fieldValue: hashedNewPasswd,
    })
  }
}
