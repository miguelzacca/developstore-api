import { CorsOptions } from 'cors'
import { CookieOptions } from 'express'

interface Env {
  NODE_ENV: string
  PORT: number
  ORIGIN_ADDR: string
  API_ADDR: string
  SMTP_USER: string
  SMTP_PASS: string
  AUTH_DURATION_DAYS: number
  SECRET: string
}

export const configuration = () => ({
  get env() {
    return {
      NODE_ENV: process.env.NODE_ENV,
      PORT: Number(process.env.PORT),
      ORIGIN_ADDR: process.env.ORIGIN_ADDR,
      API_ADDR: process.env.API_ADDR,
      SMTP_USER: process.env.SMTP_USER,
      SMTP_PASS: process.env.SMTP_PASS,
      AUTH_DURATION_DAYS: Number(process.env.AUTH_DURATION_DAYS),
      SECRET: process.env.SECRET,
    } as Env
  },

  get cors() {
    return {
      origin: [this.env.ORIGIN_ADDR, this.env.API_ADDR],
      methods: ['GET', 'POST', 'PATCH', 'DELETE'],
      credentials: true,
    } as CorsOptions
  },

  get cookie() {
    return {
      httpOnly: true,
      secure: true,
      maxAge: this.env.AUTH_DURATION_DAYS * 24 * 60 * 60 * 1000,
      sameSite: 'none',
    } as CookieOptions
  },

  get serverMsg() {
    return {
      great: 'Welcome!',
      err: 'A server occurred error. Please try later.',
      denied: 'Access denied.',
      invalidToken: 'Invalid token.',
    }
  },

  get authMsg() {
    return {
      ok: 'Authentication successful.',
      incorrect: 'Incorrect password.',
      emailExists: 'This email already exists.',
      noEmailToken: 'No email token provided.',
      noVerifiedEmail: 'No email verified.',
      recoveryEmail: 'Recovery email successfully send.',
    }
  },

  get userMsg() {
    return {
      notFound: 'User not found.',
      created: 'User created successfully.',
      deleted: 'User deleted successfully.',
      updated: 'User updated successfully.',
    }
  },
})
