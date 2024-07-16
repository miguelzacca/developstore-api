import { UUID, UUIDV4, STRING, BOOLEAN } from 'sequelize'
import { db } from '../db/sequelize.js'

export const User = db.define(
  'User',
  {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    uname: {
      type: STRING(100),
      allowNull: false,
    },
    email: {
      type: STRING(100),
      unique: true,
      allowNull: false,
    },
    verifiedEmail: {
      type: BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    passwd: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    updatedAt: false,
  }
)
