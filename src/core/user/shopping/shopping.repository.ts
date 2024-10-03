import { Inject, Injectable } from '@nestjs/common'
import { ShoppingCart } from './shopping.entity.js'
import { User } from '../user.entity.js'
import { Products } from '../../products/products.entity.js'

interface IShoppingCartRepository {
  getOneShoppingCart(userId: number, productId: number): Promise<ShoppingCart>
  deleteShoppingCart(userId: number, productId: number): Promise<void>
  createShoppingCart(userId: number, productId: number): Promise<void>
  getShoppingCart(id: number): Promise<Products[]>
}

@Injectable()
export class ShoppingCartRepository implements IShoppingCartRepository {
  constructor(
    @Inject('SHOPPING')
    private shoppingCartModel: typeof ShoppingCart,
    @Inject('USER')
    private userModel: typeof User,
  ) {}

  async getOneShoppingCart(
    userId: number,
    productId: number,
  ): Promise<ShoppingCart> {
    return this.shoppingCartModel.findOne({
      where: { userId, productId },
    })
  }

  async deleteShoppingCart(userId: number, productId: number): Promise<void> {
    await this.shoppingCartModel.destroy({ where: { userId, productId } })
  }

  async createShoppingCart(userId: number, productId: number): Promise<void> {
    await this.shoppingCartModel.create({ userId, productId })
  }

  async getShoppingCart(id: number): Promise<Products[]> {
    const data = await this.userModel.findOne({
      where: { id },
      include: [
        {
          model: Products,
          as: 'shoppingCartProducts',
        },
      ],
    })

    return data?.shoppingCartProducts || []
  }
}
