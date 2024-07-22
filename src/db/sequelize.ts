import { Sequelize } from 'sequelize'

export const db = new Sequelize({
  dialect: 'sqlite',
  storage: './.data/database.db',
  logging: false,
})

db.authenticate().catch((err) => {
  console.error(err)
})
