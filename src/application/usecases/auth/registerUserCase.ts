import { UserRepository } from '@adapters/repositories/userRepository.js'
import { EmailServices } from '@application/services/EmailServices.js'
import { config } from '@config/config.js'
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

interface RegisterUserCaseProps {
  uname: string
  passwd: string
  email: string
}

export class RegisterUseCase {
  constructor(
    private userRepository: UserRepository,
    private emailService: EmailServices,
  ) {}

  async execute({ uname, passwd, email }: RegisterUserCaseProps) {
    const emailExists = await this.userRepository.findByField({ email })

    if (emailExists) {
      throw { custom: { status: 409, msg: config.authMsg.emailExists } }
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPasswd = await bcrypt.hash(passwd, salt)

    await this.userRepository.create({
      uname,
      email,
      passwd: hashedPasswd,
    })

    const emailToken = jwt.sign({ email }, config.env.SECRET, {
      expiresIn: '1h',
    })

    const verifyLink = `${config.env.API_ADDR}/auth/email-verify/${emailToken}`

    this.emailService.sendLink({
      to: email,
      subject: 'Email Verification Link',
      link: verifyLink,
    })
  }
}
