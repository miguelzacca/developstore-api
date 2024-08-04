import { z } from 'zod'
import { zodValidator } from '@utils/zodValidator.js'

export interface RegisterBody {
  uname: string
  email: string
  passwd: string
}

export class RegisterBodyDto implements RegisterBody {
  private registerSchema = z.object({
    uname: z.string().min(3).max(50),
    email: z.string().max(100).email(),
    passwd: z.string(),
  })

  uname: string
  email: string
  passwd: string

  constructor(data: RegisterBody) {
    const { uname, email, passwd } = zodValidator({
      data,
      schema: this.registerSchema,
    })

    this.uname = uname
    this.email = email
    this.passwd = passwd
  }
}
