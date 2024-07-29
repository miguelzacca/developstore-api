import { Router } from 'express'
import { UserControllers } from '../controllers/userControllers.js'
import { isLoggedIn } from '../middleware/isLoggedIn.js'

const router = Router()

export const createUserRoutes = (controller: UserControllers) => {
  router.get('/', isLoggedIn, controller.getUser)

  router.delete('/delete', isLoggedIn, controller.deleteUser)

  router.patch('/change-passwd', isLoggedIn, controller.changePasswd)

  router.post('/toggle-favorite', isLoggedIn, controller.toggleFavorite)

  router.get('/get-favorites', isLoggedIn, controller.getFavorites)

  return router
}
