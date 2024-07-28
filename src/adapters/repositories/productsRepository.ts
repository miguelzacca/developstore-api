import { Sequelize, Op } from 'sequelize'
import { Products } from '../../infrastructure/database/models/Products.js'

interface ProductsRepositoryInterface {
  getProducts(category?: string, search?: string): Promise<Products[]>
}

export class ProductsRepository implements ProductsRepositoryInterface {
  constructor(private productsModel: typeof Products) {}

  async getProducts(category?: string, search?: string): Promise<Products[]> {
    if (category) {
      return this.productsModel.findAll({ where: { category } })
    }

    if (!search) {
      return this.productsModel.findAll()
    }

    return this.productsModel.findAll({
      where: {
        [Op.or]: [
          Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('productName')), {
            [Op.like]: `%${search.toLowerCase()}%`,
          }),
          Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('info')), {
            [Op.like]: `%${search.toLowerCase()}%`,
          }),
        ],
      },
    })
  }
}
