import { UserRepository } from '@adapters/repositories/userRepository.js'
import { EmailServices } from '@application/services/EmailServices.js'
import { config } from '@config/config.js'
import jwt from 'jsonwebtoken'

interface PasswdRecoveryUseCaseProps {
  email: string
}

export class PasswdRecoveryUseCase {
  constructor(
    private userRepository: UserRepository,
    private emailServices: EmailServices,
  ) {}

  async execute({ email }: PasswdRecoveryUseCaseProps) {
    const userExists = await this.userRepository.findByField({ email })

    if (!userExists) {
      throw { custom: { status: 404, msg: config.userMsg.notFound } }
    }

    const recoveryToken = jwt.sign({ email }, config.env.SECRET, {
      expiresIn: '1h',
    })

    const recoveryLink = `${config.env.ORIGIN_ADDR}/passwd-change/${recoveryToken}`

    await this.emailServices.sendLink({
      to: email,
      subject: 'Password Recovery',
      link: recoveryLink,
    })
  }
}
