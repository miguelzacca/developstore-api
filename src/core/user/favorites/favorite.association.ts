import { User } from '../user.entity.js'
import { Products } from '../../products/products.entity.js'
import { Favorites } from './favorite.entity.js'

export class FavoritesAssociations {
  static define() {
    User.belongsToMany(Products, {
      through: Favorites,
      foreignKey: 'userId',
      as: 'favorites',
    })

    Products.belongsToMany(User, {
      through: Favorites,
      foreignKey: 'productId',
    })
  }
}
