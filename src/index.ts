import express from 'express'
import cors from 'cors'
import * as cron from 'node-cron'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import { config } from './config/config.js'
import { createAuthRoutes } from './adapters/http/routes/authRoutes.js'
import { createUserRoutes } from './adapters/http/routes/userRoutes.js'
import { sequelize } from './infrastructure/database/sequelize.js'
import { rmUnverifiedUsers } from './jobs/rmUnverifiedUsers.js'
import { createProductsRoutes } from './adapters/http/routes/productsRoutes.js'
import { PopulateProducts } from './infrastructure/database/seed/populateProducts.js'
import { notFound } from './adapters/http/middleware/notFound.js'
import { dependencyInjector } from './config/dependencyInjector.js'

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

const populateProducts = new PopulateProducts()

const { authControllers, userControllers, productsControllers } =
  dependencyInjector()

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
    await populateProducts.init()
    await populateProducts.run()

    const { PORT, API_ADDR } = config.env
    app.listen(PORT, () => {
      console.log(`Running... ${API_ADDR}`)
    })
  })
  .catch((err) => console.error(err))
