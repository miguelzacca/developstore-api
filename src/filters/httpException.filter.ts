import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common'
import { Response } from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const res = ctx.getResponse<Response>()
    const status = exception.getStatus()

    const raw = exception.getResponse() as string
    const rawIsString = typeof raw === 'string'

    if (rawIsString && !raw.includes('{')) {
      res.status(status).json({ msg: raw })
      return
    }

    const msg = rawIsString ? JSON.parse(raw)['message'] : raw['message']

    res.status(status).json({ zod: Array.isArray(msg) ? msg[0] : msg })
  }
}
