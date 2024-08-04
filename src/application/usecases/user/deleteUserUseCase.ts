import { UserRepository } from '@adapters/repositories/userRepository.js'
import { AuthServices } from '@application/services/authServices.js'
import { config } from '@config/config.js'

export class DeleteUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private authServices: AuthServices,
  ) {}

  async execute(token: string) {
    const id = this.authServices.jwtHandler(token, 'id')

    const user = await this.userRepository.findByField({ id })

    if (!user) {
      throw { custom: { status: 404, msg: config.userMsg.notFound } }
    }

    await this.userRepository.delete(user)
  }
}
