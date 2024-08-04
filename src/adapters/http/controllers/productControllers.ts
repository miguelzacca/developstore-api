import { Controller } from '@types'
import { GetProductsUseCase } from '@application/usecases/product/getProductsUseCase.js'
import { handleHttpErrorResponse } from '@utils/handleHttpErrorResponse.js'

export class ProductControllers {
  constructor(private getProductsUseCase: GetProductsUseCase) {}

  getProducts: Controller = async (req, res) => {
    try {
      const { search, category } = req.query as Record<string, string>

      const filteredProducts = await this.getProductsUseCase.execute(
        search,
        category,
      )

      res.status(200).json(filteredProducts)
    } catch (err) {
      handleHttpErrorResponse(res, err)
    }
  }
}
