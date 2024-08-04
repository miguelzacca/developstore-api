import { ProductsRepository } from '@adapters/repositories/productsRepository.js'
import { UserRepository } from '@adapters/repositories/userRepository.js'
import { EmailServices } from '@application/services/EmailServices.js'
import { AuthServices } from '@application/services/authServices.js'
import { EmailVerifyUseCase } from '@application/usecases/auth/emailVerifyUseCase.js'
import { LoginUseCase } from '@application/usecases/auth/loginUseCase.js'
import { PasswdRecoveryUseCase } from '@application/usecases/auth/passwdRecoveryUseCase.js'
import { RegisterUseCase } from '@application/usecases/auth/registerUserCase.js'
import { GetProductsUseCase } from '@application/usecases/product/getProductsUseCase.js'
import { ChangePasswdUseCase } from '@application/usecases/user/changePasswdUseCase.js'
import { DeleteUserUseCase } from '@application/usecases/user/deleteUserUseCase.js'
import { GetFavoritesUseCase } from '@application/usecases/user/getFavoritesUseCase.js'
import { GetUserUseCase } from '@application/usecases/user/getUserUseCase.js'
import { ToggleFavoriteUseCase } from '@application/usecases/user/toggleFavoriteUseCase.js'

export const createAuthUseCases = (
  userRepository: UserRepository,
  authServices: AuthServices,
  emailServices: EmailServices,
) => {
  const registerUseCase = new RegisterUseCase(userRepository, emailServices)
  const loginUseCase = new LoginUseCase(userRepository)

  const passwdRecoveryUseCase = new PasswdRecoveryUseCase(
    userRepository,
    emailServices,
  )

  const emailVerifyUseCase = new EmailVerifyUseCase(
    userRepository,
    authServices,
  )

  return {
    emailVerifyUseCase,
    registerUseCase,
    loginUseCase,
    passwdRecoveryUseCase,
  }
}

export const createUserUseCases = (
  userRepository: UserRepository,
  authServices: AuthServices,
) => {
  const deleteUserUseCase = new DeleteUserUseCase(userRepository, authServices)
  const getUserUseCase = new GetUserUseCase(userRepository, authServices)
  const toggleFavorite = new ToggleFavoriteUseCase(userRepository, authServices)

  const getFavoritesUseCase = new GetFavoritesUseCase(
    userRepository,
    authServices,
  )

  const changePasswdUseCase = new ChangePasswdUseCase(
    userRepository,
    authServices,
  )

  return {
    deleteUserUseCase,
    getFavoritesUseCase,
    getUserUseCase,
    toggleFavorite,
    changePasswdUseCase,
  }
}

export const createProductsUseCases = (
  productsRepository: ProductsRepository,
) => {
  const getProductsUseCase = new GetProductsUseCase(productsRepository)

  return {
    getProductsUseCase,
  }
}
