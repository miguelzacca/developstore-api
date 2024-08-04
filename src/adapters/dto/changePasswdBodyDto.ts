import { z } from 'zod'
import { zodValidator } from '@utils/zodValidator.js'

export interface ChangePasswdBody {
  passwd: string
}

export class ChangePasswdDto implements ChangePasswdBody {
  private changePasswdSchema = z.object({
    passwd: z.string().min(6).max(16),
  })

  passwd: string

  constructor(data: ChangePasswdBody) {
    const { passwd } = zodValidator({
      data,
      schema: this.changePasswdSchema,
    })

    this.passwd = passwd
  }
}
