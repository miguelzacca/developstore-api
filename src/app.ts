import express from 'express'
import cors from 'cors'
import * as cron from 'node-cron'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import { config } from './config.js'
import { authRoutes } from './routes/authRoutes.js'
import { userRoutes } from './routes/userRoutes.js'
import { db } from './db/sequelize.js'
import { rmUnverifiedUsers } from './jobs/rmUnverifiedUsers.js'
import { productsRoutes } from './routes/productRoutes.js'
import { seed } from './scripts/seed.js'

const app = express()

app.use(
  '/public',
  express.static('public', {
    maxAge: '1d',
    etag: false,
  })
)

app.use(cors(config.cors))
app.use(express.json())

app.use(cookieParser())
app.use(compression())

app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/products', productsRoutes)

cron.schedule('0 0 * * *', () => {
  rmUnverifiedUsers()
})

db.sync()
  .then(async () => {
    await seed.init()
    await seed.run()

    const PORT = config.env.PORT
    app.listen(PORT, () => {
      console.log(`Running... :${PORT}`)
    })
  })
  .catch((err) => console.error(err))
