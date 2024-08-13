import { ConfigService } from '@nestjs/config'
import { UserRepository } from '../user.repository.js'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject()
    private configService: ConfigService,
    @Inject()
    private userRepository: UserRepository,
  ) {}

  async execute(id: number) {
    const user = await this.userRepository.findByField({ id })

    if (!user) {
      const msg = this.configService.get('userMsg.notFound')
      throw { custom: { status: 404, msg } }
    }

    await this.userRepository.delete(user)
  }
}
