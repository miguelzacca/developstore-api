import { Sequelize, Op } from 'sequelize'
import { Products } from '@domain/entities/Products.js'

interface ProductsRepositoryInterface {
  getAllProducts(): Promise<Products[]>
  getByCategory(category: string): Promise<Products[]>
  getByGenericSearch(search: string): Promise<Products[]>
}

export class ProductsRepository implements ProductsRepositoryInterface {
  constructor(private productsModel: typeof Products) {}

  async getAllProducts(): Promise<Products[]> {
    return this.productsModel.findAll()
  }

  async getByCategory(category: string): Promise<Products[]> {
    return this.productsModel.findAll({ where: { category } })
  }

  async getByGenericSearch(search: string): Promise<Products[]> {
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
