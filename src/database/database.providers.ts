import { Sequelize } from 'sequelize-typescript'
import { User } from '../core/user/user.entity.js'
import { Favorites } from '../core/user/favorites/favorite.entity.js'
import { Products } from '../core/products/products.entity.js'
import { ShoppingCart } from '../core/user/shopping/shopping.entity.js'

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: './.data/database.db',
        logging: false,
      })
      sequelize.addModels([User, Products, Favorites, ShoppingCart])
      await sequelize.sync()
      return sequelize
    },
  },
]
