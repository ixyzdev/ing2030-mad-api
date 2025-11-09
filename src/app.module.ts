import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { LoggerModule } from './core/logger/logger.module'
import { DatabaseModule } from './core/database/database.module'
import { HealthModule } from './core/health/health.module'

import { UsersModule } from './modules/users/users.module'

@Module({
  imports: [
    // Configuración global de variables de entorno
    ConfigModule.forRoot({
      isGlobal: true
    }),

    // Infraestructura core
    LoggerModule, // logger global
    DatabaseModule, // Mongoose forRootAsync + connectionFactory
    HealthModule, // /health con Terminus

    // Módulos de dominio / features
    UsersModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
