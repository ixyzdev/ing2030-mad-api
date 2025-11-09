import { ConfigService } from '@nestjs/config'
import { MongooseModuleOptions } from '@nestjs/mongoose'
import { connectionFactory } from './mongoose.config'

export const createMongooseConfig = (
  config: ConfigService
): MongooseModuleOptions => {
  const uri = config.get<string>('MONGO_URI')

  if (!uri) {
    throw new Error('[DatabaseConfig] Missing MONGO_URI environment variable')
  }

  return {
    uri,
    connectionFactory,
    serverSelectionTimeoutMS: 5000,
    autoIndex: process.env.NODE_ENV !== 'production'
  }
}
