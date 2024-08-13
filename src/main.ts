import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module.js'
import cors from 'cors'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import { ConfigService } from '@nestjs/config'
import { PopulateProductsService } from './database/seed/populateProducts.service.js'
import { ValidationPipe } from '@nestjs/common'
import { HttpExceptionFilter } from './filters/httpException.filter.js'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(ConfigService)
  const populateProductsService = app.get(PopulateProductsService)

  app.use(cors(configService.get('cors')))

  app.use(
    rateLimit({
      windowMs: 1 * 60 * 1000,
      max: 100,
    }),
  )

  app.use(cookieParser())
  app.use(compression())

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )

  app.useGlobalFilters(new HttpExceptionFilter())

  await populateProductsService.init()
  await populateProductsService.run()

  const config = new DocumentBuilder()
    .setTitle('Develop Store')
    .setDescription('The Develop Store API')
    .setVersion('latest')
    .addTag('developstore-api')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  await app.listen(configService.get('env.PORT') || 3000)
}
bootstrap()
