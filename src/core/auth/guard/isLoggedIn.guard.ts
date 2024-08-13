import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import jwt from 'jsonwebtoken'
import { Observable } from 'rxjs'

@Injectable()
export class isLoggedIn implements CanActivate {
  constructor(
    @Inject()
    private configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest()
    const token = req.params?.token || req.cookies?.token

    if (!token) {
      throw new HttpException('Forbidden', 403)
    }

    try {
      jwt.verify(token, this.configService.get('env.SECRET'))
      return true
    } catch {
      throw new HttpException('Unauthorized', 401)
    }
  }
}
