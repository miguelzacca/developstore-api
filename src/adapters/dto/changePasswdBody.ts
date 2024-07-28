import { z } from 'zod'

export interface ChangePasswdBody {
  passwd: string
}

export class ChangePasswdDTO implements ChangePasswdBody {
  private static registerSchema = z.object({
    passwd: z.string().min(6).max(16),
  })

  private static validate(data: object) {
    return this.registerSchema.parse(data)
  }

  passwd: string

  constructor(private data: ChangePasswdBody) {
    const { passwd } = ChangePasswdDTO.validate(data)
    this.passwd = passwd
  }
}
