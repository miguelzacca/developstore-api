import { Router } from 'express'
import { isLoggedIn } from '../middleware/isLoggedIn.js'
import { AuthControllers } from '../controllers/authControllers.js'

const router = Router()

export const createAuthRoutes = (controller: AuthControllers) => {
  router.get('/email-verify/:token', controller.emailVerify)

  router.post('/register', controller.register)

  router.post('/login', controller.login)

  router.get('/passwd-recovery/:email', controller.passwdRecovery)

  router.get('/token-validator/:token', isLoggedIn, controller.tokenValidator)

  return router
}
