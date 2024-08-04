import { UserRepository } from '@adapters/repositories/userRepository.js'
import { AuthServices } from '@application/services/authServices.js'

export class ToggleFavoriteUseCase {
  constructor(
    private userRepository: UserRepository,
    private authServices: AuthServices,
  ) {}

  async execute(token: string, productId: string) {
    const userId = this.authServices.jwtHandler(token, 'id')
    await this.userRepository.toggleFavorite(userId, productId)
  }
}
