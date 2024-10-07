import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional } from 'class-validator'

export class UpdateFieldBody {
  @ApiProperty()
  @IsNotEmpty()
  fieldName: string

  @ApiProperty()
  @IsOptional()
  fieldValue: any
}
