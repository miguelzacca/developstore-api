import { config } from '@config/config.js'
import * as nodemailer from 'nodemailer'

interface SendEmailProps {
  to: string
  subject: string
  link: string
}

export class EmailServices {
  private transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: config.env.SMTP_USER,
      pass: config.env.SMTP_PASS,
    },
  })

  async sendLink({ to, subject, link }: SendEmailProps): Promise<void> {
    await this.transporter.sendMail({
      from: 'Develop Store',
      to,
      subject,
      html: `<h3 style="font-weight: 400">${link}</h3>`,
    })
  }
}
