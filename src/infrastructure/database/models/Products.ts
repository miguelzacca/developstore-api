import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../sequelize.js'

export interface ProductsAttributes {
  id?: string
  category: string
  productName: string
  info: string
  img: string
  oldPrice: number
  price: number
}

export class Products
  extends Model<ProductsAttributes>
  implements ProductsAttributes
{
  static initialize(dbInstance: typeof sequelize) {
    Products.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        category: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        productName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        info: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        img: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        oldPrice: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
      },
      {
        sequelize: dbInstance,
        modelName: 'Products',
      },
    )
  }

  get id() {
    return this.getDataValue('id')
  }

  get category() {
    return this.getDataValue('category')
  }

  get productName() {
    return this.getDataValue('productName')
  }

  get info() {
    return this.getDataValue('info')
  }

  get img() {
    return this.getDataValue('img')
  }

  get oldPrice() {
    return this.getDataValue('oldPrice')
  }

  get price() {
    return this.getDataValue('price')
  }
}
