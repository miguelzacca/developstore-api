import { UserRepository } from '@adapters/repositories/userRepository.js'
import { config } from '@config/config.js'
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

interface LoginUserCaseProps {
  email: string
  passwd: string
}

export class LoginUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, passwd }: LoginUserCaseProps) {
    const user = await this.userRepository.findByField({ email })

    if (!user) {
      throw { custom: { status: 404, msg: config.userMsg.notFound } }
    }

    if (!user.verified_email) {
      throw { custom: { status: 400, msg: config.authMsg.noVerifiedEmail } }
    }

    const checkPasswd = await bcrypt.compare(passwd, user.passwd)

    if (!checkPasswd) {
      throw { custom: { status: 422, msg: config.authMsg.incorrect } }
    }

    const token = jwt.sign({ id: user.id }, config.env.SECRET, {
      expiresIn: `${config.env.AUTH_DURATION_DAYS * 24}h`,
    })

    return token
  }
}
