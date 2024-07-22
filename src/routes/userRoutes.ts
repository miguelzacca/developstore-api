import { Router } from 'express'
import { userControllers as user } from '../controllers/userControllers.js'
import { checkToken } from '../middleware/checkToken.js'

const router = Router()

router.get('/', checkToken, user.getUser)

router.patch('/update', checkToken, user.patchUser)

router.delete('/delete', checkToken, user.deleteUser)

router.patch('/change-passwd', checkToken, user.changePasswd)

router.post('/toggle-favorite', checkToken, user.toggleFavorite)

router.get('/get-favorites', checkToken, user.getFavorite)

export const userRoutes = router
