import { HttpException } from '@nestjs/common'

export class HandleError {
  static http(err: any) {
    if (err.message) {
      throw new HttpException(err.message, 422)
    }

    if (err.custom) {
      const { custom } = err
      throw new HttpException(custom.msg, custom.status)
    }

    console.error(err)
    throw new HttpException('A server occurred error. Please, try later.', 500)
  }
}
