import { Model } from 'sequelize'

export interface ProductsAttributes {
  id?: string
  category: string
  productName: string
  info: string
  img: string
  oldPrice: number
  price: number
}

export class ProductsEntity extends Model<ProductsAttributes> {
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
