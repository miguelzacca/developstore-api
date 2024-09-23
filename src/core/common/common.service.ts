import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import jwt, { JwtPayload } from 'jsonwebtoken'
import * as nodemailer from 'nodemailer'

interface SendEmailProps {
  to: string
  subject: string
  link: string
}

@Injectable()
export class CommonServices {
  constructor(@Inject() private configService: ConfigService) {}

  extractJwtPayload(token: string, payloadName?: string) {
    const payload = jwt.verify(
      token,
      this.configService.get('env.SECRET'),
    ) as JwtPayload
    return payloadName && payload[payloadName]
  }

  private transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: this.configService.get('env.SMTP_USER'),
      pass: this.configService.get('env.SMTP_PASS'),
    },
  })

  async sendLink({ to, subject, link }: SendEmailProps): Promise<void> {
    await this.transporter.sendMail({
      from: {
        name: 'Develop Store',
        address: this.configService.get('env.SMTP_USER'),
      },
      to,
      subject,
      html: `<h3 style="font-weight: 400">${link}</h3>`,
    })
  }
}
