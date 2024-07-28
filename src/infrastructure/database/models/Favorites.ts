import { User } from './User.js'
import { Products } from './Products.js'
import { sequelize } from '../sequelize.js'
import { INTEGER, Model, UUID } from 'sequelize'

export interface FavoritesAttributes {
  userId: string
  productId: string
}

export class Favorites
  extends Model<FavoritesAttributes>
  implements FavoritesAttributes
{
  userId!: string
  productId!: string
}

Favorites.init(
  {
    userId: {
      type: UUID,
      primaryKey: true,
      references: {
        model: User,
        key: 'id',
      },
    },
    productId: {
      type: INTEGER,
      primaryKey: true,
      references: {
        model: Products,
        key: 'id',
      },
    },
  },
  {
    sequelize,
  }
)

User.belongsToMany(Products, {
  through: Favorites,
  foreignKey: 'userId',
  as: 'favorites',
})

Products.belongsToMany(User, {
  through: Favorites,
  foreignKey: 'productId',
})
