import { Op } from 'sequelize'
import { User } from '../models/User.js'

export const rmUnverifiedUsers = async () => {
  try {
    const paramDate = new Date(Date.now() - 1 * 60 * 60 * 1000)

    await User.destroy({
      where: {
        verifiedEmail: false,
        createdAt: {
          [Op.lt]: paramDate,
        },
      },
    })
  } catch (err) {
    console.error(err)
  }
}
