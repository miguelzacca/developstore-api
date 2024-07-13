import { config } from '../config.js'

export const products = [
  ...Array.from({ length: 7 }, (_, i) => ({
    id: i + 1,
    category: 'Recommended',
    productName: 'Product Name',
    info: 'Small information',
    img: `${config.env.API_HOST}/public/product.webp`,
    oldPrice: 5.99,
    price: 2.99,
  })),
  ...Array.from({ length: 7 }, (_, i) => ({
    id: i + 8,
    category: 'Popular 2024',
    productName: 'Product Name',
    info: 'Popular 2024',
    img: `${config.env.API_HOST}/public/product.webp`,
    oldPrice: 3.25,
    price: 1.99,
  })),
  ...Array.from({ length: 7 }, (_, i) => ({
    id: i + 15,
    category: 'The best',
    productName: 'Product Name',
    info: 'The best',
    img: `${config.env.API_HOST}/public/product.webp`,
    oldPrice: 24.99,
    price: 14.99,
  })),
]
