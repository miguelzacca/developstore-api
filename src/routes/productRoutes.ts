import { Router } from 'express'
import { productControllers as product } from '../controllers/productControllers.js'

const router = Router()

router.get('/', product.getProducts)

export const productsRoutes = router
