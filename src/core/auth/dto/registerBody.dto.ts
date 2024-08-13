import { IsEmail, IsNotEmpty, Length } from 'class-validator'

export class RegisterBody {
  @IsNotEmpty()
  @Length(3, 50)
  uname: string

  @IsNotEmpty()
  @Length(0, 100)
  @IsEmail()
  email: string

  @IsNotEmpty()
  @Length(6, 16)
  passwd: string
}
