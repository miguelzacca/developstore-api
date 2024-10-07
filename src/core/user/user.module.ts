import { Module } from '@nestjs/common'
import { UserControllers } from './user.controller.js'
import { UserServices } from './user.service.js'
import { GetUserUseCase } from './usecases/getUser.usecase.js'
import { DeleteUserUseCase } from './usecases/deleteUser.usecase.js'
import { ToggleFavoriteUseCase } from './usecases/toggleFavorite.usecase.js'
import { GetFavoritesUseCase } from './usecases/getFavorites.usecase.js'
import { ChangePasswdUseCase } from './usecases/changePasswd.usecase.js'
import { UserRepository } from './user.repository.js'
import { CommonModule } from '../common/common.module.js'
import { DatabaseModule } from '../../database/database.module.js'
import { userProviders } from './providers/user.providers.js'
import { favoriteProviders } from './providers/favorite.providers.js'
import { ConfigModule } from '@nestjs/config'
import { FavoriteRepository } from './favorites/favorite.repository.js'
import { ToggleShoppingCartUseCase } from './usecases/toggleShopping.usecase.js'
import { GetShoppingCartUseCase } from './usecases/getShopping.usecase.js'
import { ShoppingCartRepository } from './shopping/shopping.repository.js'
import { shoppingCartProviders } from './providers/shopping.providers.js'
import { UpdateFieldUseCase } from './usecases/updateField.usecase.js'

@Module({
  imports: [CommonModule, DatabaseModule, ConfigModule],
  controllers: [UserControllers],
  providers: [
    UserServices,
    GetUserUseCase,
    DeleteUserUseCase,
    ToggleFavoriteUseCase,
    GetFavoritesUseCase,
    ToggleShoppingCartUseCase,
    UpdateFieldUseCase,
    ShoppingCartRepository,
    GetShoppingCartUseCase,
    ChangePasswdUseCase,
    FavoriteRepository,
    UserRepository,
    ...userProviders,
    ...favoriteProviders,
    ...shoppingCartProviders,
  ],
  exports: [UserRepository, FavoriteRepository, ShoppingCartRepository],
})
export class UserModule {}
