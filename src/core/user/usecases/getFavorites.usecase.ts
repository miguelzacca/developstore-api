import { UserRepository } from '../user.repository.js'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class GetFavoritesUseCase {
  constructor(@Inject() private userRepository: UserRepository) {}

  async execute(id: number) {
    return await this.userRepository.getFavorites(id)
  }
}
