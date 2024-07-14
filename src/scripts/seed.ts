import { config } from '../config.js'
import { Products } from '../models/Products.js'

interface ProductEl {
  id: number
  category: string
  productName: string
  info: string
  img: string
  oldPrice: number
  price: number
}

const products: ProductEl[] = [
  ...Array.from({ length: 7 }, (_, i) => ({
    id: i + 1,
    category: 'Recommended',
    productName: `Product Name - ${i + 1}`,
    info: 'Small information',
    img: `${config.env.API_HOST}/public/product.webp`,
    oldPrice: 5.99,
    price: 2.99,
  })),
  ...Array.from({ length: 7 }, (_, i) => ({
    id: i + 8,
    category: 'Popular 2024',
    productName: `Product Name - ${i + 8}`,
    info: 'Popular 2024',
    img: `${config.env.API_HOST}/public/product.webp`,
    oldPrice: 3.25,
    price: 1.99,
  })),
  ...Array.from({ length: 7 }, (_, i) => ({
    id: i + 15,
    category: 'The best',
    productName: `Product Name - ${i + 15}`,
    info: 'The best',
    img: `${config.env.API_HOST}/public/product.webp`,
    oldPrice: 24.99,
    price: 14.99,
  })),
]

class Seed {
  private products: ProductEl[]

  constructor(products: ProductEl[]) {
    this.products = products
  }

  public init = async () => {
    try {
      await Products.destroy({ where: {} })
      console.log('SEED CLEAN')
    } catch (err) {
      console.error(err)
    }
  }

  public run = async () => {
    try {
      for (const product of this.products) {
        const { id, productName, img, category, price, oldPrice, info } =
          product

        await Products.create({
          id,
          productName,
          img,
          category,
          price,
          oldPrice,
          info,
        })
      }
      console.log('GENERATED SEED\n')
    } catch (err) {
      console.error(err)
    }
  }
}

export const seed = new Seed(products)
