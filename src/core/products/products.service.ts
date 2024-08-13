import { GetProductsUseCase } from './usecases/getProducts.usecase.js'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class ProductsServices {
  constructor(
    @Inject()
    private getProductsUseCase: GetProductsUseCase,
  ) {}

  async getProducts(search?: string, category?: string) {
    return this.getProductsUseCase.execute(search, category)
  }
}
