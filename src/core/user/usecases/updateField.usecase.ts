import { Injectable } from '@nestjs/common'
import { UserRepository } from '../user.repository.js'

@Injectable()
export class UpdateFieldUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: number, fieldName: string, fieldValue: any) {
    const user = await this.userRepository.findByField({ id: userId })
    return this.userRepository.updateField({ user, fieldName, fieldValue })
  }
}
