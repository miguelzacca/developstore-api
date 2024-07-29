import { z } from 'zod'
import * as utils from '../../utils.js'

export interface RegisterBody {
  uname: string
  email: string
  passwd: string
}

export class RegisterBodyDTO implements RegisterBody {
  private registerSchema = z.object({
    uname: z.string().min(3).max(50),
    email: z.string().max(100).email(),
    passwd: z.string(),
  })

  uname: string
  email: string
  passwd: string

  constructor(data: RegisterBody) {
    const { uname, email, passwd } = utils.zodValidator({
      data,
      schema: this.registerSchema,
    })

    this.uname = uname
    this.email = email
    this.passwd = passwd
  }
}
