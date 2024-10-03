import { ShoppingCartRepository } from '../shopping/shopping.repository.js'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class ToggleShoppingCartUseCase {
  constructor(
    @Inject()
    private shoppingCartRepository: ShoppingCartRepository,
  ) {}

  async execute(userId: number, productId: number) {
    const shoppingCart = await this.shoppingCartRepository.getOneShoppingCart(
      userId,
      productId,
    )

    if (shoppingCart) {
      await this.shoppingCartRepository.deleteShoppingCart(userId, productId)
      return
    }

    await this.shoppingCartRepository.createShoppingCart(userId, productId)
  }
}
