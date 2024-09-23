import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, Length } from 'class-validator'

export class ChangePasswdBody {
  @ApiProperty()
  @IsNotEmpty()
  @Length(6, 16)
  passwd: string
}
