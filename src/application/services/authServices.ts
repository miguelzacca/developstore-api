import { config } from '@config/config.js'
import jwt, { JwtPayload } from 'jsonwebtoken'

interface AuthServicesInterface {
  jwtHandler(token: string, payloadName?: string): any
}

export class AuthServices implements AuthServicesInterface {
  jwtHandler = (token: string, payloadName?: string) => {
    const payload = jwt.verify(token, config.env.SECRET) as JwtPayload
    return payloadName && payload[payloadName]
  }
}
