import {
  Table,
  Model,
  Column,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript'
import { Products } from '../products/products.entity.js'
import { Favorites } from './favorites/favorite.entity.js'
import { ShoppingCart } from './shopping/shopping.entity.js'

@Table({ tableName: 'users', updatedAt: false })
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
    type: DataType.TEXT,
    allowNull: true
  })
  profile_image: string | null

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

  @BelongsToMany(() => Products, {
    through: () => ShoppingCart,
    foreignKey: {
      name: 'userId',
    },
    as: 'shoppingCartProducts',
  })
  shoppingCartProducts: Products[]
}
