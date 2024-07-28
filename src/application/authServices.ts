import { config } from '../config.js'

interface SendEmailProps {
  to: string
  subject: string
  link: string
}

interface AuthServicesInterface {
  sendEmail({ to, subject, link }: SendEmailProps): Promise<void>
}

export class AuthServices implements AuthServicesInterface {
  async sendEmail({ to, subject, link }: SendEmailProps): Promise<void> {
    await config.transporter.sendMail({
      from: 'Develop Store',
      to,
      subject,
      html: `<h3 style="font-weight: 400">${link}</h3>`,
    })
  }
}
