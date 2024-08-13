import { GetProductsUseCase } from './usecases/getProducts.usecase.js'
import { HandleError } from '../../shared/utils/handleError.js'
import { Controller, Get, Inject, Query } from '@nestjs/common'

@Controller('/products')
export class ProductsControllers {
  constructor(
    @Inject()
    private getProductsUseCase: GetProductsUseCase,
  ) {}

  @Get('/')
  async getProducts(@Query() query?: { search?: string; category?: string }) {
    try {
      const { search, category } = query

      const filteredProducts = await this.getProductsUseCase.execute(
        search,
        category,
      )

      return filteredProducts
    } catch (err) {
      HandleError.http(err)
    }
  }
}
