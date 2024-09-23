import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, Length } from 'class-validator'

export class RegisterBody {
  @ApiProperty()
  @IsNotEmpty()
  @Length(3, 50)
  uname: string

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
