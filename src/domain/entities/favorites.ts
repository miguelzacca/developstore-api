import { Model } from 'sequelize'

export interface FavoritesAttributes {
  userId: string
  productId: string
}

export class FavoritesEntity extends Model<FavoritesAttributes> {
  get userId(): string {
    return this.userId
  }

  set userId(id: string) {
    this.userId = id
  }

  get productId(): string {
    return this.productId
  }

  set productId(id: string) {
    this.productId = id
  }
}
