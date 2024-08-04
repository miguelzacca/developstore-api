import { AuthControllers } from '@adapters/http/controllers/authControllers.js'
import { ProductControllers } from '@adapters/http/controllers/productControllers.js'
import { UserControllers } from '@adapters/http/controllers/userControllers.js'
import {
  createRepositories,
  createServices,
} from './repositoriesAndServicesDi.js'
import {
  createAuthUseCases,
  createProductsUseCases,
  createUserUseCases,
} from './useCasesDi.js'

export const createControllers = () => {
  const { userRepository, productsRepository } = createRepositories()
  const { authServices, emailServices } = createServices()

  const authUseCases = createAuthUseCases(
    userRepository,
    authServices,
    emailServices,
  )

  const userUseCases = createUserUseCases(userRepository, authServices)
  const productsUseCases = createProductsUseCases(productsRepository)

  const authControllers = new AuthControllers(
    authUseCases.emailVerifyUseCase,
    authUseCases.registerUseCase,
    authUseCases.loginUseCase,
    authUseCases.passwdRecoveryUseCase,
  )

  const userControllers = new UserControllers(
    userUseCases.getUserUseCase,
    userUseCases.changePasswdUseCase,
    userUseCases.deleteUserUseCase,
    userUseCases.toggleFavorite,
    userUseCases.getFavoritesUseCase,
  )

  const productsControllers = new ProductControllers(
    productsUseCases.getProductsUseCase,
  )

  return {
    authControllers,
    userControllers,
    productsControllers,
  }
}
