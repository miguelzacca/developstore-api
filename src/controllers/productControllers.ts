import { Controller } from '../types/global'
import { Products } from '../models/Products.js'
import { utils } from '../utils.js'
import { Op, Sequelize } from 'sequelize'

class ProductControllers {
  public getProducts: Controller = async (req, res) => {
    try {
      const { search, category } = req.query as Record<string, string>

      if (category) {
        const filteredProducts = await Products.findAll({ where: { category } })
        return res.status(200).json(filteredProducts)
      }

      if (!search) {
        const allProducts = await Products.findAll()
        return res.status(200).json(allProducts)
      }

      const filteredProducts = await Products.findAll({
        where: {
          [Op.or]: [
            Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('productName')), {
              [Op.like]: `%${search.toLowerCase()}%`
            }),
            Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('info')), {
              [Op.like]: `%${search.toLowerCase()}%`
            }),
          ],
        },
      })

      res.status(200).json(filteredProducts)
    } catch (err) {
      utils.handleError(res, err)
    }
  }
}

export const productControllers = new ProductControllers()
