import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class ToggleShoppingCartBody {
  @ApiProperty()
  @IsNotEmpty()
  productId: number
}
