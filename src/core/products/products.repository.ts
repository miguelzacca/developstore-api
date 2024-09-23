import { Sequelize, Op } from 'sequelize'
import { Products } from './products.entity.js'
import { Inject, Injectable } from '@nestjs/common'

interface ProductRepositoryInterface {
  getAllProducts(): Promise<Products[]>
  getByCategory(category: string): Promise<Products[]>
  getByGenericSearch(search: string): Promise<Products[]>
}

@Injectable()
export class ProductsRepository implements ProductRepositoryInterface {
  constructor(
    @Inject('PRODUCTS')
    private productModel: typeof Products,
  ) {}

  async getAllProducts(): Promise<Products[]> {
    return this.productModel.findAll()
  }

  async getByCategory(category: string): Promise<Products[]> {
    return this.productModel.findAll({ where: { category } })
  }

  async getByGenericSearch(search: string): Promise<Products[]> {
    return this.productModel.findAll({
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
