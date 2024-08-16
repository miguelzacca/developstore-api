import { Inject, Injectable } from '@nestjs/common'
import { Favorites } from './favorite.entity.js'
import { User } from '../user.entity.js'
import { Products } from '../../products/products.entity.js'

interface IFavoritesRepository {
  getOneFavorite(userId: number, productId: number): Promise<Favorites>
  deleteFavorite(userId: number, productId: number): Promise<void>
  createFavorite(userId: number, productId: number): Promise<void>
  getFavorites(id: number): Promise<Products[]>
}

@Injectable()
export class FavoriteRepository implements IFavoritesRepository {
  constructor(
    @Inject('FAVORITES')
    private favoriteModel: typeof Favorites,
    @Inject('USER')
    private userModel: typeof User,
  ) {}

  async getOneFavorite(userId: number, productId: number): Promise<Favorites> {
    return this.favoriteModel.findOne({
      where: { userId, productId },
    })
  }

  async deleteFavorite(userId: number, productId: number): Promise<void> {
    await this.favoriteModel.destroy({ where: { userId, productId } })
  }

  async createFavorite(userId: number, productId: number): Promise<void> {
    await this.favoriteModel.create({ userId, productId })
  }

  async getFavorites(id: number): Promise<Products[]> {
    const data = await this.userModel.findOne({
      where: { id },
      include: [
        {
          model: Products,
          as: 'favoriteProducts',
        },
      ],
    })

    return data?.favoriteProducts || []
  }
}
