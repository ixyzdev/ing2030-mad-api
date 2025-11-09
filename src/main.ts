import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

import { ValidationPipe } from '@nestjs/common'

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { LoggerService } from './core/logger/logger.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true
  })
  app.enableShutdownHooks()

  const logger = app.get<LoggerService>(LoggerService)
  app.useLogger(logger)

  // Validaciones globales
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  )

  // Configuración base del documento Swagger
  const config = new DocumentBuilder()
    .setTitle('API de MAD Chile')
    .setDescription('Documentación de la API REST del backend')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: { persistAuthorization: true }
  })

  await app.listen(process.env.PORT ?? 3000)
}

void bootstrap()
