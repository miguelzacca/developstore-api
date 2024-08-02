import { config } from '../../config/config.js'
import * as nodemailer from 'nodemailer'
import jwt, { JwtPayload } from 'jsonwebtoken'

interface SendEmailProps {
  to: string
  subject: string
  link: string
}

interface AuthServicesInterface {
  sendEmail({ to, subject, link }: SendEmailProps): Promise<void>
  jwtHandler(token: string, payloadName?: string): any
}

export class AuthServices implements AuthServicesInterface {
  private transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: config.env.SMTP_USER,
      pass: config.env.SMTP_PASS,
    },
  })

  async sendEmail({ to, subject, link }: SendEmailProps): Promise<void> {
    await this.transporter.sendMail({
      from: 'Develop Store',
      to,
      subject,
      html: `<h3 style="font-weight: 400">${link}</h3>`,
    })
  }

  jwtHandler = (token: string, payloadName?: string) => {
    const payload = jwt.verify(token, config.env.SECRET) as JwtPayload
    return payloadName && payload[payloadName]
  }
}
