import { sequelize } from '../sequelize.js'
import { DataTypes, Model } from 'sequelize'

export interface FavoritesAttributes {
  userId: string
  productId: string
}

export class Favorites
  extends Model<FavoritesAttributes>
  implements FavoritesAttributes
{
  static initialize(dbInstance: typeof sequelize) {
    Favorites.init(
      {
        userId: {
          type: DataTypes.UUID,
          primaryKey: true,
          references: {
            model: 'User',
            key: 'id',
          },
        },
        productId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          references: {
            model: 'Products',
            key: 'id',
          },
        },
      },
      {
        sequelize: dbInstance,
      },
    )
  }

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
