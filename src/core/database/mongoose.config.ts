import { Connection } from 'mongoose'

/**
 * connectionFactory
 * -----------------
 * Hook que se ejecuta inmediatamente después de que NestJS crea la conexión Mongoose.
 *
 * Actualmente:
 *   - Registra eventos básicos (connected, disconnected, error).
 *
 * Futuro escalable:
 *   - Integrar logging estructurado (Pino / Winston / custom LoggerModule).
 *   - Emitir métricas Prometheus (e.g., mongodb_connection_status).
 *   - Reportar fallos críticos al sistema de monitoreo (Grafana, Loki, Sentry, etc.).
 *   - Implementar reintentos automáticos o reconexión exponencial.
 *   - Ejecutar tareas de inicialización condicionales (seed, índices, validaciones).
 */

export const connectionFactory = (connection: Connection): Connection => {
  // Evento: conexión establecida exitosamente
  connection.on('connected', () => {
    console.log('[MongoDB] Connected')
    // TODO: metrics.emit('mongodb_connection_status', { status: 'connected' })
    // TODO: logger.info('MongoDB connected', { host: connection.host })
  })

  // Evento: conexión perdida o cerrada
  connection.on('disconnected', () => {
    console.warn('[MongoDB] Disconnected')
    // TODO: metrics.emit('mongodb_connection_status', { status: 'disconnected' })
    // TODO: alerting.notify('MongoDB disconnected')
  })

  // Evento: error en la conexión
  connection.on('error', (err: Error) => {
    console.error('[MongoDB] Error:', err.message)
    // TODO: logger.error('MongoDB connection error', { message: err.message, stack: err.stack })
    // TODO: sentry.captureException(err)
  })

  // TODO: conexión inicial -> ejecutar tareas de inicialización
  // connection.once('open', async () => {
  //   await runInitialSeed()
  //   logger.info('Database initialization tasks completed')
  // })

  return connection
}
