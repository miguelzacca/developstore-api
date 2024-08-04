import { DataTypes } from 'sequelize'
import { sequelize } from '../sequelize.js'
import { User } from '@domain/entities/User.js'

export const initUserModel = (entity: typeof User) => {
  entity.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      uname: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
      },
      verified_email: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      passwd: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      updatedAt: false,
    },
  )
}
