import { Products } from './Products.js'
import { sequelize } from '../sequelize.js'
import { INTEGER, UUID } from 'sequelize'
import { FavoritesEntity } from '../../../domain/favorites.js'
import { User } from './User.js'

export const Favorites = FavoritesEntity.init(
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
  },
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
