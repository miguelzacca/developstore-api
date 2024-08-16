import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript'
import { Products } from '../../products/products.entity.js'
import { User } from '../user.entity.js'

@Table({ tableName: 'favorites', timestamps: false })
export class Favorites extends Model<Favorites> {
  @ForeignKey(() => User)
  @Column({ type: DataType.BIGINT, primaryKey: true })
  userId: number

  @ForeignKey(() => Products)
  @Column({ type: DataType.BIGINT })
  productId: number
}
