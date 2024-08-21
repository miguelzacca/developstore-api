import { Products } from './products.entity.js'

export const productsProviders = [
  {
    provide: 'PRODUCTS',
    useValue: Products,
  },
]
