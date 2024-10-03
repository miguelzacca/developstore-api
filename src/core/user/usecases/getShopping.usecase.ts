import { ShoppingCartRepository } from '../shopping/shopping.repository.js'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class GetShoppingCartUseCase {
  constructor(
    @Inject() private shoppingCartRepository: ShoppingCartRepository,
  ) {}

  async execute(id: number) {
    return await this.shoppingCartRepository.getShoppingCart(id)
  }
}
