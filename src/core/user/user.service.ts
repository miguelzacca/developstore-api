import { ChangePasswdUseCase } from './usecases/changePasswd.usecase.js'
import { DeleteUserUseCase } from './usecases/deleteUser.usecase.js'
import { GetFavoritesUseCase } from './usecases/getFavorites.usecase.js'
import { GetUserUseCase } from './usecases/getUser.usecase.js'
import { ToggleFavoriteUseCase } from './usecases/toggleFavorite.usecase.js'
import { Inject } from '@nestjs/common'
import { CommonServices } from '../../shared/common/common.service.js'

export class UserServices {
  constructor(
    @Inject()
    private commonServices: CommonServices,
    @Inject()
    private getUserUseCase: GetUserUseCase,
    @Inject()
    private changePasswdUseCase: ChangePasswdUseCase,
    @Inject()
    private deleteUserUseCase: DeleteUserUseCase,
    @Inject()
    private toggleFavoriteUseCase: ToggleFavoriteUseCase,
    @Inject()
    private getFavoritesUseCase: GetFavoritesUseCase,
  ) {}

  async getUser(token: string) {
    const id = this.commonServices.extractJwtPayload(token, 'id')
    return this.getUserUseCase.execute(id)
  }

  async changePasswd(token: string, newPasswd: string) {
    const email = this.commonServices.extractJwtPayload(token, 'email')
    return this.changePasswdUseCase.execute(email, newPasswd)
  }

  async deleteUser(token: string) {
    const id = this.commonServices.extractJwtPayload(token, 'id')
    return this.deleteUserUseCase.execute(id)
  }

  async toggleFavorite(token: string, productId: number) {
    const userId = this.commonServices.extractJwtPayload(token, 'id')
    return this.toggleFavoriteUseCase.execute(userId, productId)
  }

  async getFavorites(token: string) {
    const id = this.commonServices.extractJwtPayload(token, 'id')
    return this.getFavoritesUseCase.execute(id)
  }
}
