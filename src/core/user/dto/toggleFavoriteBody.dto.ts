import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class ToggleFavoriteBody {
  @ApiProperty()
  @IsNotEmpty()
  productId: number
}
