import express from 'express'
import cors from 'cors'
import * as cron from 'node-cron'
import cookieParser from 'cookie-parser'
import { config } from './config.js'
import { authRoutes } from './routes/authRoutes.js'
import { userRoutes } from './routes/userRoutes.js'
import { db } from './db/sequelize.js'
import { rmUnverifiedUsers } from './jobs/rmUnverifiedUsers.js'

const app = express()

app.use(cors(config.cors))
app.use(express.json())
app.use(cookieParser())

app.use('/auth', authRoutes)
app.use('/user', userRoutes)

cron.schedule('0 0 * * *', async () => {
  await rmUnverifiedUsers()
})

db.sync()
  .then(() => {
    const PORT = config.env.PORT
    app.listen(PORT, () => {
      console.log(`Running... :${PORT}`)
    })
  })
  .catch((err) => console.error(err))
