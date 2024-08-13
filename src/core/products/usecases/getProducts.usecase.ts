import { ProductsRepository } from '../products.repository.js'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class GetProductsUseCase {
  constructor(@Inject() private productsRepository: ProductsRepository) {}

  async execute(search?: string, category?: string) {
    if (category) {
      return this.productsRepository.getByCategory(category)
    }

    if (search) {
      return this.productsRepository.getByGenericSearch(search)
    }

    return this.productsRepository.getAllProducts()
  }
}
