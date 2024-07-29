import { Router } from 'express'
import { ProductControllers } from '../controllers/productControllers.js'

const router = Router()

export const createProductsRoutes = (controller: ProductControllers) => {
  router.get('/', controller.getProducts)

  return router
}
