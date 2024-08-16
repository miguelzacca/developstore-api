import { FindAttributeOptions } from 'sequelize'
import { RegisterBody } from '../auth/dto/registerBody.dto.js'
import { User } from './user.entity.js'
import { Inject, Injectable } from '@nestjs/common'

interface UpdateField {
  user: User
  fieldName: string
  fieldValue: any
}

export interface IUserRepository {
  findByField(
    field: Record<string, any>,
    restrict?: boolean,
  ): Promise<User | null>
  delete(target: number | User): Promise<void>
  updateField({ user, fieldName, fieldValue }: UpdateField): Promise<void>
  save(user: User): Promise<void>
  create(userAttributes: RegisterBody): Promise<void>
}

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @Inject('USER')
    private userModel: typeof User,
  ) {}

  async findByField(
    field: Record<string, any>,
    restrict?: boolean,
  ): Promise<User | null> {
    const fieldKey = Object.keys(field)[0]

    let attributes: FindAttributeOptions | undefined = undefined
    if (restrict) {
      attributes = { exclude: ['id', 'passwd', 'verified_email'] }
    }

    return this.userModel.findOne({
      where: { [fieldKey]: field[fieldKey] },
      attributes,
    })
  }

  async delete(target: number | User): Promise<void> {
    if (typeof target === 'number') {
      await this.userModel.destroy({ where: { id: target } })
      return
    }
    await target.destroy()
  }

  async updateField({
    user,
    fieldName,
    fieldValue,
  }: UpdateField): Promise<void> {
    user[fieldName] = fieldValue
    await this.save(user)
  }

  async save(user: User): Promise<void> {
    await user.save()
  }

  async create(userAttributes: RegisterBody): Promise<void> {
    await this.userModel.create(userAttributes)
  }
}
