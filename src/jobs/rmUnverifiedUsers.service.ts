import { Op } from 'sequelize'
import { User } from '../core/user/user.entity.js'
import { Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'

@Injectable()
export class RmUnverifiedUsers {
  @Cron('0 0 * * *')
  async handleCron() {
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
}
