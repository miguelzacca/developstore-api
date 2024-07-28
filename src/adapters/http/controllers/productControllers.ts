import { Controller } from '../../../types/global.js'
import * as utils from '../../../utils.js'
import { ProductsRepository } from '../../repositories/productsRepository.js'

export class ProductControllers {
  constructor(private productsRepository: ProductsRepository) {}

  getProducts: Controller = async (req, res) => {
    try {
      const { search, category } = req.query as Record<string, string>

      const filteredProducts = await this.productsRepository.getProducts(
        category,
        search,
      )

      res.status(200).json(filteredProducts)
    } catch (err) {
      utils.handleError(res, err)
    }
  }
}
