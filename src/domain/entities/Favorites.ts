import { initFavoritesModel } from '@infrastructure/database/models/FavoritesModel.js'
import { Model } from 'sequelize'

export interface FavoritesAttributes {
  userId: string
  productId: string
}

export class Favorites
  extends Model<FavoritesAttributes>
  implements FavoritesAttributes
{
  get userId(): string {
    return this.getDataValue('userId')
  }

  set userId(id: string) {
    this.setDataValue('userId', id)
  }

  get productId(): string {
    return this.getDataValue('productId')
  }

  set productId(id: string) {
    this.setDataValue('productId', id)
  }
}

initFavoritesModel(Favorites)
