import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from '../../../config/config.js'
import { Controller } from '../../../types/global.js'
import { UserRepository } from '../../repositories/userRepository.js'
import { RegisterBodyDTO } from '../../dto/registerBody.js'
import { AuthServices } from '../../../application/services/authServices.js'
import * as utils from '../../../utils.js'

export class AuthControllers {
  constructor(
    private userRepository: UserRepository,
    private authServices: AuthServices,
  ) {}

  emailVerify: Controller = async (req, res) => {
    try {
      const { token: emailToken } = req.params

      if (!emailToken) {
        return res.status(400).json({ msg: config.authMsg.noEmailToken })
      }

      const email = this.authServices.jwtHandler(emailToken, 'email')

      const user = await this.userRepository.findByField({ email })

      if (!user) {
        return res.status(400).json({ msg: config.serverMsg.invalidToken })
      }

      if (user.verified_email) {
        return res.redirect(`${config.env.ORIGIN_ADDR}/login`)
      }

      user.verified_email = true
      await this.userRepository.save(user)

      res.status(200).redirect(`${config.env.ORIGIN_ADDR}/login`)
    } catch (err) {
      utils.handleError(res, err)
    }
  }

  register: Controller = async (req, res) => {
    try {
      const { uname, email, passwd } = new RegisterBodyDTO(req.body)

      const emailExists = await this.userRepository.findByField({ email })

      if (emailExists) {
        return res.status(409).json({ msg: config.authMsg.emailExists })
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

      this.authServices.sendEmail({
        to: email,
        subject: 'Email Verification Link',
        link: verifyLink,
      })

      res.status(201).json({ msg: config.userMsg.created })
    } catch (err) {
      utils.handleError(res, err)
    }
  }

  login: Controller = async (req, res) => {
    try {
      const { email, passwd } = req.body

      const user = await this.userRepository.findByField({ email })

      if (!user) {
        return res.status(404).json({ msg: config.userMsg.notFound })
      }

      if (!user.verified_email) {
        return res.status(400).json({ msg: config.authMsg.noVerifiedEmail })
      }

      const checkPasswd = await bcrypt.compare(passwd, user.passwd)

      if (!checkPasswd) {
        return res.status(422).json({ msg: config.authMsg.incorrect })
      }

      const token = jwt.sign({ id: user.id }, config.env.SECRET, {
        expiresIn: `${config.env.AUTH_DURATION_DAYS * 24}h`,
      })

      res.cookie('token', token, config.cookie)

      res.status(200).json({ msg: config.authMsg.ok })
    } catch (err) {
      utils.handleError(res, err)
    }
  }

  passwdRecovery: Controller = async (req, res) => {
    try {
      const { email } = req.params

      const userExists = await this.userRepository.findByField({ email })

      if (!userExists) {
        return res.status(404).json({ msg: config.userMsg.notFound })
      }

      const recoveryToken = jwt.sign({ email }, config.env.SECRET, {
        expiresIn: '1h',
      })

      const recoveryLink = `${config.env.ORIGIN_ADDR}/passwd-change/${recoveryToken}`

      this.authServices.sendEmail({
        to: email,
        subject: 'Password Recovery',
        link: recoveryLink,
      })

      res.status(200).json({ msg: config.authMsg.recoveryEmail })
    } catch (err) {
      utils.handleError(res, err)
    }
  }

  tokenValidator: Controller = (req, res) => {
    const { token } = req.params
    const { setCookie } = req.query

    if (setCookie) {
      res.cookie('token', token, config.cookie)
    }

    res.sendStatus(200)
  }
}
