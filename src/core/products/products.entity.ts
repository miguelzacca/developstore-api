import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript'
import { User } from '../user/user.entity.js'
import { Favorites } from '../user/favorites/favorite.entity.js'

@Table({ tableName: 'products', timestamps: false })
export class Products extends Model<Products> {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  category: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  productName: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  info: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  img: string

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  oldPrice: number

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  price: number
}
