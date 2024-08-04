import { ProductsRepository } from '@adapters/repositories/productsRepository.js'
import { UserRepository } from '@adapters/repositories/userRepository.js'
import { EmailServices } from '@application/services/EmailServices.js'
import { AuthServices } from '@application/services/authServices.js'
import { Favorites } from '@domain/entities/Favorites.js'
import { Products } from '@domain/entities/Products.js'
import { User } from '@domain/entities/User.js'

export const createRepositories = () => {
  const userRepository = new UserRepository(User, Favorites, Products)
  const productsRepository = new ProductsRepository(Products)

  return {
    userRepository,
    productsRepository,
  }
}

export const createServices = () => {
  const authServices = new AuthServices()
  const emailServices = new EmailServices()

  return {
    authServices,
    emailServices,
  }
}
