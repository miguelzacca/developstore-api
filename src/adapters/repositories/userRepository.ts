import { FindAttributeOptions } from 'sequelize'
import * as bcrypt from 'bcrypt'
import { RegisterBody } from '../dto/registerBodyDto.js'
import { Favorites } from '@domain/entities/Favorites.js'
import { Products } from '@domain/entities/Products.js'
import { User } from '@domain/entities/User.js'

export interface IUserRepository {
  findByField(
    field: Record<string, any>,
    restrict?: boolean,
  ): Promise<User | null>
  delete(target: string | User): Promise<void>
  changePasswd(id: string, newPasswd: string): Promise<void>
  save(user: User): Promise<void>
  create(userAttributes: RegisterBody): Promise<void>
  toggleFavorite(userId: string, productId: string): Promise<void>
  getFavorites(id: string): Promise<Favorites[]>
}

export class UserRepository implements IUserRepository {
  constructor(
    private userModel: typeof User,
    private favoriteModel: typeof Favorites,
    private productModel: typeof Products,
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

  async delete(target: string | User): Promise<void> {
    if (typeof target === 'string') {
      await this.userModel.destroy({ where: { id: target } })
      return
    }
    await target.destroy()
  }

  async changePasswd(id: string, newPasswd: string): Promise<void> {
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

  async toggleFavorite(userId: string, productId: string): Promise<void> {
    const isFavorite = await this.favoriteModel.findOne({
      where: { productId },
    })

    if (isFavorite) {
      this.favoriteModel.destroy({ where: { productId } })
      return
    }

    this.favoriteModel.create({ userId, productId })
  }

  async getFavorites(id: string): Promise<Favorites[]> {
    const data = await this.userModel.findOne({
      where: { id },
      include: [
        {
          model: this.productModel,
          as: 'favorites',
        },
      ],
    })

    return data?.favorites || []
  }
}
