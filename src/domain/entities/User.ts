import { initUserModel } from '@infrastructure/database/models/UserModel.js'
import { Favorites } from './Favorites.js'
import { Model } from 'sequelize'

export interface UserAttributes {
  id?: string
  uname: string
  email: string
  verified_email?: boolean
  passwd: string
  createdAt?: Date
  favorites?: Favorites[]
}

export class User extends Model<UserAttributes> implements UserAttributes {
  get verified_email(): boolean | undefined {
    return this.getDataValue('verified_email')
  }

  set verified_email(state: boolean) {
    this.setDataValue('verified_email', state)
  }

  get passwd(): string {
    return this.getDataValue('passwd')
  }

  set passwd(value: string) {
    this.setDataValue('passwd', value)
  }

  get id(): string | undefined {
    return this.getDataValue('id')
  }

  get uname(): string {
    return this.getDataValue('uname')
  }

  get email(): string {
    return this.getDataValue('email')
  }

  get createdAt(): Date | undefined {
    return this.getDataValue('createdAt')
  }

  get favorites(): Favorites[] | undefined {
    return this.getDataValue('favorites')
  }

  set favorites(value: Favorites[]) {
    this.setDataValue('favorites', value)
  }
}

initUserModel(User)
