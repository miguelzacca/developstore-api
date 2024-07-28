import { Router } from 'express'
import { ProductControllers } from '../controllers/productControllers.js'

const router = Router()

export const createProductsRoutes = (products: ProductControllers) => {
  router.get('/', products.getProducts)

  return router
}
