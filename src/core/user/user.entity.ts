import {
  Table,
  Model,
  Column,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript'
import { Products } from '../products/products.entity.js'
import { Favorites } from './favorites/favorite.entity.js'

@Table({ tableName: 'users', timestamps: false })
export class User extends Model<User> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  uname: string

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  email: string

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  verified_email: boolean

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  passwd: string

  @BelongsToMany(() => Products, {
    through: () => Favorites,
    foreignKey: {
      name: 'userId',
    },
    as: 'favoriteProducts',
  })
  favoriteProducts: Products[]
}
