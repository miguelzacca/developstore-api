import { FavoriteRepository } from '../favorites/favorite.repository.js'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class GetFavoritesUseCase {
  constructor(@Inject() private favoriteRepository: FavoriteRepository) {}

  async execute(id: number) {
    return await this.favoriteRepository.getFavorites(id)
  }
}
