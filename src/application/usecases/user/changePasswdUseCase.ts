import { UserRepository } from '@adapters/repositories/userRepository.js'
import { AuthServices } from '@application/services/authServices.js'
import { config } from '@config/config.js'

export class ChangePasswdUseCase {
  constructor(
    private userRepository: UserRepository,
    private authServices: AuthServices,
  ) {}

  async execute(token: string, newPasswd: string) {
    const email = this.authServices.jwtHandler(token, 'email')

    const user = await this.userRepository.findByField({ email })

    if (!user) {
      throw { custom: { status: 404, msg: config.userMsg.notFound } }
    }

    await this.userRepository.changePasswd(user.id as string, newPasswd)
  }
}
