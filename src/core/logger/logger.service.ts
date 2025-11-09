import {
  Injectable,
  Logger,
  LoggerService as NestLoggerService
} from '@nestjs/common'

@Injectable()
export class LoggerService extends Logger implements NestLoggerService {
  log(message: string, context?: string) {
    super.log(message, context)
  }
  error(message: string, trace?: string, context?: string) {
    super.error(message, trace, context)
  }
  warn(message: string, context?: string) {
    super.warn(message, context)
  }
  debug(message: string, context?: string) {
    super.debug(message, context)
  }
  verbose(message: string, context?: string) {
    super.verbose(message, context)
  }

  // Punto de extensión futuro:
  // - enviar logs a stdout en formato JSON
  // - integrar con Pino/Winston
  // - enviar errores a Sentry/Datadog
  // - agregar correlación de request IDs
}
