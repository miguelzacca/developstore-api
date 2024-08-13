import { IsNotEmpty, Length } from 'class-validator'

export class ChangePasswdBody {
  @IsNotEmpty()
  @Length(6, 16)
  passwd: string
}
