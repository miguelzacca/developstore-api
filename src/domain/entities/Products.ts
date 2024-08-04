import { initProductsModel } from '@infrastructure/database/models/ProductsModel.js'
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

export class Products
  extends Model<ProductsAttributes>
  implements ProductsAttributes
{
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

initProductsModel(Products)
