import { Router } from 'express'
import { userControllers as user } from '../controllers/userControllers.js'
import { checkToken } from '../middleware/checkToken.js'

const router = Router()

router.get('/', checkToken, user.getUser)

router.patch('/update', checkToken, user.patchUser)

router.delete('/delete', checkToken, user.deleteUser)

router.patch('/change-passwd', checkToken, user.changePasswd)

export const userRoutes = router
