import { IsEmail, IsNotEmpty, Length } from 'class-validator'

export class LoginBody {
  @IsNotEmpty()
  @Length(0, 100)
  @IsEmail()
  email: string

  @IsNotEmpty()
  @Length(6, 16)
  passwd: string
}
