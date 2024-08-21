import { IsNotEmpty } from 'class-validator'

export class ToggleFavoriteBody {
  @IsNotEmpty()
  productId: number
}
