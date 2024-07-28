import express from 'express'
import cors from 'cors'
import * as cron from 'node-cron'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import { config } from './config.js'
import { createAuthRoutes } from './adapters/http/routes/authRoutes.js'
import { createUserRoutes } from './adapters/http/routes/userRoutes.js'
import { sequelize } from './infrastructure/database/sequelize.js'
import { rmUnverifiedUsers } from './jobs/rmUnverifiedUsers.js'
import { createProductsRoutes } from './adapters/http/routes/productsRoutes.js'
import { Seed } from './infrastructure/database/seed/populatedb.js'
import { AuthControllers } from './adapters/http/controllers/authControllers.js'
import { UserRepository } from './adapters/repositories/userRepository.js'
import { AuthServices } from './application/authServices.js'
import { User } from './infrastructure/database/models/User.js'
import { Favorites } from './infrastructure/database/models/Favorites.js'
import { UserControllers } from './adapters/http/controllers/userControllers.js'
import { ProductControllers } from './adapters/http/controllers/productControllers.js'
import { ProductsRepository } from './adapters/repositories/productsRepository.js'
import { Products } from './infrastructure/database/models/Products.js'
import { notFound } from './adapters/http/middleware/notFound.js'

const app = express()

app.use(
  '/public',
  express.static('public', {
    maxAge: '1d',
    etag: false,
  }),
)

app.use(cors(config.cors))
app.use(express.json())
app.use(cookieParser())
app.use(compression())

const populatedb = new Seed()

const userRepository = new UserRepository(User, Favorites)
const productsRepository = new ProductsRepository(Products)

const authServices = new AuthServices()

const authControllers = new AuthControllers(userRepository, authServices)
const userControllers = new UserControllers(userRepository)
const productsControllers = new ProductControllers(productsRepository)

const authRoutes = createAuthRoutes(authControllers)
const userRoutes = createUserRoutes(userControllers)
const productsRoutes = createProductsRoutes(productsControllers)

app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/products', productsRoutes)
app.use(notFound)

cron.schedule('0 0 * * *', async () => {
  await rmUnverifiedUsers()
})

sequelize
  .sync()
  .then(async () => {
    await populatedb.init()
    await populatedb.run()

    const { PORT, API_ADDR } = config.env
    app.listen(PORT, () => {
      console.log(`Running... ${API_ADDR}`)
    })
  })
  .catch((err) => console.error(err))
