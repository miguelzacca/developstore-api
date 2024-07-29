import { UUID, UUIDV4, STRING, BOOLEAN } from 'sequelize'
import { sequelize } from '../sequelize.js'
import { UserEntity } from '../../../domain/entities/user.js'

export const User = UserEntity.init(
  {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    uname: {
      type: STRING(50),
      allowNull: false,
    },
    email: {
      type: STRING(100),
      unique: true,
      allowNull: false,
    },
    verified_email: {
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
    sequelize,
    updatedAt: false,
  },
)
