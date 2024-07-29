import { z } from 'zod'
import * as utils from '../../utils.js'

export interface ChangePasswdBody {
  passwd: string
}

export class ChangePasswdDTO implements ChangePasswdBody {
  private changePasswdSchema = z.object({
    passwd: z.string().min(6).max(16),
  })

  passwd: string

  constructor(data: ChangePasswdBody) {
    const { passwd } = utils.zodValidator({
      data,
      schema: this.changePasswdSchema,
    })

    this.passwd = passwd
  }
}
