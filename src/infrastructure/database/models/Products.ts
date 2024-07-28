import { sequelize } from '../sequelize.js'
import { INTEGER, STRING, DECIMAL, Model } from 'sequelize'

export interface ProductsAttributes {
  id?: string
  category: string
  productName: string
  info: string
  img: string
  oldPrice: number
  price: number
}

export class Products extends Model<ProductsAttributes> {
  private props!: ProductsAttributes

  get id() {
    return this.props.id
  }

  get category() {
    return this.props.category
  }

  get productName() {
    return this.props.productName
  }

  get info() {
    return this.props.info
  }

  get img() {
    return this.props.img
  }

  get oldPrice() {
    return this.props.oldPrice
  }

  get price() {
    return this.props.price
  }
}

Products.init(
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productName: {
      type: STRING,
      unique: true,
      allowNull: false,
    },
    category: {
      type: STRING,
      allowNull: false,
    },
    info: {
      type: STRING,
      allowNull: false,
    },
    img: {
      type: STRING,
      allowNull: false,
    },
    oldPrice: {
      type: DECIMAL,
      allowNull: true,
    },
    price: {
      type: DECIMAL,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
  },
)
