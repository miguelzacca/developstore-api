import { Router } from 'express'
import { UserControllers } from '../controllers/userControllers.js'
import { isLoggedIn } from '../middleware/isLoggedIn.js'

const router = Router()

export const createUserRoutes = (user: UserControllers) => {
  router.get('/', isLoggedIn, user.getUser)

  router.delete('/delete', isLoggedIn, user.deleteUser)

  router.patch('/change-passwd', isLoggedIn, user.changePasswd)

  router.post('/toggle-favorite', isLoggedIn, user.toggleFavorite)

  router.get('/get-favorites', isLoggedIn, user.getFavorites)

  return router
}
