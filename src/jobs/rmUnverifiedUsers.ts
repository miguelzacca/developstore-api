import { Op } from 'sequelize'
import { User } from '@domain/entities/User.js'

export const rmUnverifiedUsers = async () => {
  try {
    const paramDate = new Date(Date.now() - 1 * 60 * 60 * 1000)

    await User.destroy({
      where: {
        verified_email: false,
        createdAt: {
          [Op.lt]: paramDate,
        },
      },
    })
  } catch (err) {
    console.error(err)
  }
}
