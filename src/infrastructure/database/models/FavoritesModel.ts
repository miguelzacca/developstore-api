import { Favorites } from '@domain/entities/Favorites.js'
import { sequelize } from '../sequelize.js'
import { DataTypes } from 'sequelize'
import { User } from '@domain/entities/User.js'
import { Products } from '@domain/entities/Products.js'

export const initFavoritesModel = (entity: typeof Favorites) => {
  entity.init(
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
      sequelize,
    },
  )

  User.belongsToMany(Products, {
    through: entity,
    foreignKey: 'userId',
    as: 'favorites',
  })

  Products.belongsToMany(User, {
    through: entity,
    foreignKey: 'productId',
  })
}
