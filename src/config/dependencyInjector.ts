import { sequelize } from '../infrastructure/database/sequelize.js'
import { AuthControllers } from '../adapters/http/controllers/authControllers.js'
import { ProductControllers } from '../adapters/http/controllers/productControllers.js'
import { UserControllers } from '../adapters/http/controllers/userControllers.js'
import { ProductsRepository } from '../adapters/repositories/productsRepository.js'
import { UserRepository } from '../adapters/repositories/userRepository.js'
import { AuthServices } from '../application/services/authServices.js'
import { Favorites } from '../infrastructure/database/models/Favorites.js'
import { Products } from '../infrastructure/database/models/Products.js'
import { User } from '../infrastructure/database/models/User.js'
import { UserFavorites } from '../infrastructure/database/associations/UserFavorites.js'

export const createDependecies = () => {
  Products.initialize(sequelize)
  Favorites.initialize(sequelize)
  User.initialize(sequelize)

  UserFavorites({
    productModel: Products,
    favoritesModel: Favorites,
    userModel: User,
  })

  const userRepository = new UserRepository(User, Favorites, Products)
  const productsRepository = new ProductsRepository(Products)
  const authServices = new AuthServices()

  const authControllers = new AuthControllers(userRepository, authServices)
  const userControllers = new UserControllers(userRepository, authServices)
  const productsControllers = new ProductControllers(productsRepository)

  return {
    authControllers,
    userControllers,
    productsControllers,
  }
}
