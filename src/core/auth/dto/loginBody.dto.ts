import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, Length } from 'class-validator'

export class LoginBody {
  @ApiProperty()
  @IsNotEmpty()
  @Length(0, 100)
  @IsEmail()
  email: string

  @ApiProperty()
  @IsNotEmpty()
  @Length(6, 16)
  passwd: string
}
