import { ShoppingCart } from '../shopping/shopping.entity.js'

export const shoppingCartProviders = [
  {
    provide: 'SHOPPING',
    useValue: ShoppingCart,
  },
]
