import { config as envConfig } from 'dotenv'
import * as nodemailer from 'nodemailer'
import { utils } from './utils.js'

envConfig()

class Config {
  public get env() {
    try {
      return utils.validateInput(process.env, 'env')
    } catch (err: any) {
      throw new Error(err.zod)
    }
  }

  public transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: this.env.SMTP_USER,
      pass: this.env.SMTP_PASS,
    },
  })

  public cors = {
    origin: [this.env.ORIGIN_HOST, this.env.API_HOST],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
  }

  public cookie: object = {
    httpOnly: true,
    secure: true,
    maxAge: this.env.AUTH_DURATION_DAYS * 24 * 60 * 60 * 1000,
    sameSite: 'None',
  }

  public authMsg = {
    ok: 'Authentication successful.',
    incorrect: 'Incorrect password.',
    emailExists: 'This email already exists.',
    noEmailToken: 'No email token provided.',
    noVerifiedEmail: 'No email verified.',
    recoveryEmail: 'Recovery email successfully send.',
  }

  public userMsg = {
    notFound: 'User not found.',
    created: 'User created successfully.',
    deleted: 'User deleted successfully.',
    updated: 'User updated successfully.',
  }

  public serverMsg = {
    great: 'Welcome!',
    err: 'A server occurred error. Please try later.',
    denied: 'Access denied.',
    invalidToken: 'Invalid token.',
  }
}

export const config = new Config()
