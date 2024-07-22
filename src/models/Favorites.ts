import { User } from './User.js'
import { Products } from './Products.js'
import { db } from '../db/sequelize.js'
import { INTEGER, UUID } from 'sequelize'

export const Favorites = db.define('Favorites', {
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
})

User.belongsToMany(Products, {
  through: Favorites,
  foreignKey: 'userId',
  as: 'favorites',
})

Products.belongsToMany(User, {
  through: Favorites,
  foreignKey: 'productId',
})
