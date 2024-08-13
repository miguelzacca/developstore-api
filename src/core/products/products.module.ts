import { Module } from '@nestjs/common'
import { ProductsServices } from './products.service.js'
import { GetProductsUseCase } from './usecases/getProducts.usecase.js'
import { ProductsRepository } from './products.repository.js'
import { ProductsControllers } from './products.controller.js'
import { DatabaseModule } from '../../database/database.module.js'
import { productsProviders } from './products.providers.js'

@Module({
  imports: [DatabaseModule],
  controllers: [ProductsControllers],
  providers: [
    ProductsServices,
    GetProductsUseCase,
    ProductsRepository,
    ...productsProviders,
  ],
})
export class ProductsModule {}
