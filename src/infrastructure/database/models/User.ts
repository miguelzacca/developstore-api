import { UUID, UUIDV4, STRING, BOOLEAN, Model } from 'sequelize'
import { sequelize } from '../sequelize.js'
import { Favorites } from './Favorites.js'

export interface UserAttributes {
  id?: string
  uname: string
  email: string
  verified_email?: boolean
  passwd: string
  favorites?: Favorites[]
  createdAt?: Date
}

export class User extends Model<UserAttributes> implements UserAttributes {
  id!: string
  uname!: string
  email!: string
  verified_email!: boolean
  passwd!: string
  favorites?: Favorites[]
  createdAt?: Date
}

User.init(
  {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    uname: {
      type: STRING(50),
      allowNull: false,
    },
    email: {
      type: STRING(100),
      unique: true,
      allowNull: false,
    },
    verified_email: {
      type: BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    passwd: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    updatedAt: false,
  },
)
