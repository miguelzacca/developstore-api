import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript'
import { Products } from '../../products/products.entity.js'
import { User } from '../user.entity.js'

@Table({ tableName: 'shoppingCart', timestamps: false })
export class ShoppingCart extends Model<ShoppingCart> {
  @ForeignKey(() => User)
  @Column({ type: DataType.BIGINT, primaryKey: true })
  userId: number

  @ForeignKey(() => Products)
  @Column({ type: DataType.BIGINT, primaryKey: true })
  productId: number
}
