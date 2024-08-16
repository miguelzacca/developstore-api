import { FavoriteRepository } from '../favorites/favorite.repository.js'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class ToggleFavoriteUseCase {
  constructor(
    @Inject()
    private favoriteRepository: FavoriteRepository,
  ) {}

  async execute(userId: number, productId: number) {
    const favorite = await this.favoriteRepository.getOneFavorite(
      userId,
      productId,
    )

    if (favorite) {
      await this.favoriteRepository.deleteFavorite(userId, productId)
      return
    }

    await this.favoriteRepository.createFavorite(userId, productId)
  }
}
