import { UserRepository } from '@adapters/repositories/userRepository.js'
import { AuthServices } from '@application/services/authServices.js'
import { config } from '@config/config.js'

export class EmailVerifyUseCase {
  constructor(
    private userRepository: UserRepository,
    private authServices: AuthServices,
  ) {}

  async execute(emailToken: string) {
    const email = this.authServices.jwtHandler(emailToken, 'email')

    const user = await this.userRepository.findByField({ email })

    if (!user) {
      throw { custom: { status: 400, msg: config.serverMsg.invalidToken } }
    }

    if (user.verified_email) {
      return
    }

    user.verified_email = true
    await this.userRepository.save(user)
  }
}
