import { z } from 'zod'

export interface RegisterBody {
  uname: string
  email: string
  passwd: string
}

export class RegisterBodyDTO implements RegisterBody {
  private static registerSchema = z.object({
    uname: z.string().min(3).max(50),
    email: z.string().max(100).email(),
    passwd: z.string(),
  })

  private static validate(data: object) {
    return this.registerSchema.parse(data)
  }

  uname: string
  email: string
  passwd: string

  constructor(private data: RegisterBody) {
    const { uname, email, passwd } = RegisterBodyDTO.validate(data)
    this.uname = uname
    this.email = email
    this.passwd = passwd
  }
}
