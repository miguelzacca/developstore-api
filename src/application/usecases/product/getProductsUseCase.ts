import { ProductsRepository } from '@adapters/repositories/productsRepository.js'

export class GetProductsUseCase {
  constructor(private productsRepository: ProductsRepository) {}

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
