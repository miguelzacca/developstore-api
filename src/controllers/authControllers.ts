import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'
import { config } from '../config.js'
import { utils } from '../utils.js'
import { Controller } from '../types/global.js'

class AuthControllers {
  public emailVerify: Controller = async (req, res) => {
    const emailToken = req.params?.token

    if (!emailToken) {
      return res.status(400).json({ msg: config.authMsg.noEmailToken })
    }

    try {
      const email = utils.jwtVerify(emailToken, 'email')

      const user = await utils.findUserByField({ email })

      if (!user) {
        return res.status(400).json({ msg: config.serverMsg.invalidToken })
      }

      if (user['verifiedEmail']) {
        return res.redirect(`${config.env.ORIGIN_HOST}/login`)
      }

      user['verifiedEmail'] = true
      await user.save()

      res.status(200).redirect(`${config.env.ORIGIN_HOST}/login`)
    } catch (err) {
      utils.handleError(res, err)
    }
  }

  public register: Controller = async (req, res) => {
    try {
      const sanitizedInput = utils.sanitizeInput(req.body)
      const { name, email, passwd } = utils.validateInput(
        sanitizedInput,
        'register'
      )

      const emailExists = await utils.findUserByField({ email })

      if (emailExists) {
        return res.status(409).json({ msg: config.authMsg.emailExists })
      }

      const salt = await bcrypt.genSalt(12)
      const passwdHash = await bcrypt.hash(passwd, salt)

      await User.create({
        name,
        email,
        passwd: passwdHash,
      })

      const emailToken = jwt.sign({ email }, config.env.SECRET, {
        expiresIn: '1h',
      })

      const verifyLink = `${config.env.API_HOST}/auth/email-verify/${emailToken}`

      utils.sendEmail({
        to: email,
        subject: 'Email Verification Link',
        link: verifyLink,
      })

      res.status(201).json({ msg: config.userMsg.created })
    } catch (err) {
      utils.handleError(res, err)
    }
  }

  public login: Controller = async (req, res) => {
    try {
      const { email, passwd } = utils.sanitizeInput(req.body)

      const user = await utils.findUserByField({ email })

      if (!user) {
        return res.status(404).json({ msg: config.userMsg.notFound })
      }

      if (!user['verifiedEmail']) {
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

  public passwdRecovery: Controller = async (req, res) => {
    const { email } = req.params

    try {
      const userExists = await utils.findUserByField({ email })

      if (!userExists) {
        return res.status(404).json({ msg: config.userMsg.notFound })
      }

      const recoveryToken = jwt.sign({ email }, config.env.SECRET, {
        expiresIn: '1h',
      })

      const recoveryLink = `${config.env.ORIGIN_HOST}/passwd-change/${recoveryToken}`

      utils.sendEmail({
        to: email,
        subject: 'Password Recovery',
        link: recoveryLink,
      })

      res.status(200).json({ msg: config.authMsg.recoveryEmail })
    } catch (err) {
      utils.handleError(res, err)
    }
  }

  public tokenValidator: Controller = (req, res) => {
    const { token } = req.params
    const { setCookie } = req.query

    if (setCookie) {
      res.cookie('token', token, config.cookie)
    }

    res.sendStatus(200)
  }
}

export const authControllers = new AuthControllers()
