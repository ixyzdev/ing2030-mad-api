import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { HealthService } from './health.service'
import { HealthCheckResult } from '@nestjs/terminus'

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly service: HealthService) {}

  @Get()
  @ApiOperation({
    summary: 'Health check',
    description: 'Estado de la API y dependencias críticas'
  })
  @ApiOkResponse({
    description: 'Formato estándar de Terminus',
    schema: {
      example: {
        status: 'ok',
        info: {
          mongodb_primary: { status: 'up' }
        },
        error: {},
        details: {
          mongodb_primary: { status: 'up' }
        }
      }
    }
  })
  check(): Promise<HealthCheckResult> {
    return this.service.checkAll()
  }
}
