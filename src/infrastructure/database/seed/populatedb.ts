import { config } from '../../../config.js'
import { Products } from '../models/Products.js'
import { faker } from '@faker-js/faker'

interface ProductEl {
  category: string
  productName: string
  info: string
  img: string
  oldPrice: number
  price: number
}

export class Seed {
  private products: ProductEl[] = [
    ...Array.from({ length: 7 }, () => ({
      category: 'Recommended',
      productName: faker.commerce.productName().slice(0, 20),
      info: faker.commerce.productDescription().slice(0, 20),
      img: `${config.env.API_ADDR}/public/product.webp`,
      oldPrice: 5.99,
      price: 2.99,
    })),
    ...Array.from({ length: 7 }, () => ({
      category: 'Popular 2024',
      productName: faker.commerce.productName().slice(0, 20),
      info: faker.commerce.productDescription().slice(0, 20),
      img: `${config.env.API_ADDR}/public/product.webp`,
      oldPrice: 3.25,
      price: 1.99,
    })),
    ...Array.from({ length: 7 }, () => ({
      category: 'The best',
      productName: faker.commerce.productName().slice(0, 20),
      info: faker.commerce.productDescription().slice(0, 20),
      img: `${config.env.API_ADDR}/public/product.webp`,
      oldPrice: 24.99,
      price: 14.99,
    })),
  ]

  async init() {
    try {
      await Products.destroy({ where: {} })
      console.log('SEED INIT')
    } catch (err) {
      console.error(err)
    }
  }

  async run() {
    try {
      for (const product of this.products) {
        const { productName, img, category, price, oldPrice, info } = product

        await Products.create({
          productName,
          img,
          category,
          price,
          oldPrice,
          info,
        })
      }
      console.log('SEED RUN\n')
    } catch (err) {
      console.error(err)
    }
  }
}
