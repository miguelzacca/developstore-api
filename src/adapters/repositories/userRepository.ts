import { FindAttributeOptions } from 'sequelize'
import { User } from '../../infrastructure/database/models/User.js'
import * as bcrypt from 'bcrypt'
import { RegisterBody } from '../dto/registerBody.js'
import { Favorites } from '../../infrastructure/database/models/Favorites.js'
import { Products } from '../../infrastructure/database/models/Products.js'
import { UserEntity } from '../../domain/user.js'
import { FavoritesEntity } from '../../domain/favorites.js'

export interface IUserRepository {
  findByField(
    field: Record<string, any>,
    restrict?: boolean,
  ): Promise<UserEntity | null>
  delete(target: string | UserEntity): Promise<void>
  changePasswd(id: string, newPasswd: string): Promise<void>
  save(user: UserEntity): Promise<void>
  create(userAttributes: RegisterBody): Promise<void>
  toggleFavorite(userId: string, productId: string): Promise<void>
  getFavorites(id: string): Promise<FavoritesEntity[]>
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
  ): Promise<UserEntity | null> {
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

  async delete(target: string | UserEntity): Promise<void> {
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
    const hashedNewPasswd = await bcrypt.hash(salt, newPasswd)

    user.set('passwd', hashedNewPasswd)
  }

  async save(user: UserEntity): Promise<void> {
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

  async getFavorites(id: string): Promise<FavoritesEntity[]> {
    const data = await this.userModel.findOne({
      where: { id },
      include: [
        {
          model: this.productModel,
          as: 'favorites',
        },
      ],
    })

    // eslint-disable-next-line
    // @ts-expect-error
    return data?.favorites || []
  }
}
