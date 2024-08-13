import { FindAttributeOptions } from 'sequelize'
import * as bcrypt from 'bcrypt'
import { RegisterBody } from '../auth/dto/registerBody.dto.js'
import { Favorites } from './favorites/favorite.entity.js'
import { Products } from '../products/products.entity.js'
import { User } from './user.entity.js'
import { Inject, Injectable } from '@nestjs/common'

export interface IUserRepository {
  findByField(
    field: Record<string, any>,
    restrict?: boolean,
  ): Promise<User | null>
  delete(target: number | User): Promise<void>
  changePasswd(id: number, newPasswd: string): Promise<void>
  save(user: User): Promise<void>
  create(userAttributes: RegisterBody): Promise<void>
  toggleFavorite(userId: number, productId: number): Promise<void>
  getFavorites(id: number): Promise<Products[]>
}

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @Inject('USER')
    private userModel: typeof User,
    @Inject('FAVORITES')
    private favoriteModel: typeof Favorites,
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

  async changePasswd(id: number, newPasswd: string): Promise<void> {
    const user = await this.userModel.findByPk(id)

    if (!user) {
      throw new Error('User not found.')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedNewPasswd = await bcrypt.hash(newPasswd, salt)

    user.passwd = hashedNewPasswd
    await this.save(user)
  }

  async save(user: User): Promise<void> {
    await user.save()
  }

  async create(userAttributes: RegisterBody): Promise<void> {
    await this.userModel.create(userAttributes)
  }

  async toggleFavorite(userId: number, productId: number): Promise<void> {
    const isFavorite = await this.favoriteModel.findOne({
      where: { productId },
    })

    if (isFavorite) {
      this.favoriteModel.destroy({ where: { productId } })
      return
    }

    try {
      await this.favoriteModel.create({ userId, productId })
    } catch (error) {
      console.error(error)
    }
  }

  async getFavorites(id: number): Promise<Products[]> {
    const data = await this.userModel.findOne({
      where: { id },
      include: [{ model: Products, as: 'favorites' }],
    })

    // @ts-expect-error
    return data?.favorites || []
  }
}
