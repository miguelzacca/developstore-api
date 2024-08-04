import { UserRepository } from '@adapters/repositories/userRepository.js'
import { AuthServices } from '@application/services/authServices.js'
import { config } from '@config/config.js'

export class GetFavoritesUseCase {
  constructor(
    private userRepository: UserRepository,
    private authServices: AuthServices,
  ) {}

  async execute(token: string) {
    const id = this.authServices.jwtHandler(token, 'id')

    if (!id) {
      throw { custom: { status: 401, msg: config.serverMsg.invalidToken } }
    }

    return await this.userRepository.getFavorites(id)
  }
}
