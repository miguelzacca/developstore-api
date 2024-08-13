import { UserRepository } from '../user.repository.js'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class ToggleFavoriteUseCase {
  constructor(@Inject() private userRepository: UserRepository) {}

  async execute(userId: number, productId: number) {
    await this.userRepository.toggleFavorite(userId, productId)
  }
}
