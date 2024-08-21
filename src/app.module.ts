import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database/database.module.js'
import { ScheduleModule } from '@nestjs/schedule'
import { RmUnverifiedUsers } from './jobs/rmUnverifiedUsers.service.js'
import { UserModule } from './modules/user/user.module.js'
import { AuthModule } from './modules/auth/auth.module.js'
import { ProductsModule } from './modules/products/products.module.js'
import { configuration } from './config/configuration.js'
import { isLoggedIn } from './guard/isLoggedIn.guard.js'
import { PopulateProductsService } from './database/seed/populateProducts.service.js'

@Module({
  imports: [
    UserModule,
    AuthModule,
    ProductsModule,
    DatabaseModule,
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: 'public',
      serveRoot: '/public',
      serveStaticOptions: {
        maxAge: '1d',
        etag: false,
      },
    }),
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  providers: [RmUnverifiedUsers, isLoggedIn, PopulateProductsService],
  exports: [PopulateProductsService],
})
export class AppModule {}
