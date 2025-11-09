import { ApiProperty } from '@nestjs/swagger'

export class HealthIndicatorStatusDto {
  @ApiProperty({ example: 'up', description: 'Status of the indicator' })
  status: string
}

export class HealthCheckResponseDto {
  @ApiProperty({ example: 'ok', description: 'Global health status' })
  status: string

  @ApiProperty({
    required: false,
    description: 'Healthy indicators agrupados por nombre',
    type: HealthIndicatorStatusDto,
    isArray: false
  })
  info?: Record<string, HealthIndicatorStatusDto>

  @ApiProperty({
    required: false,
    description: 'Indicadores con error agrupados por nombre',
    type: HealthIndicatorStatusDto,
    isArray: false
  })
  error?: Record<string, HealthIndicatorStatusDto>

  @ApiProperty({
    required: false,
    description: 'Detalle completo de todos los indicadores',
    type: HealthIndicatorStatusDto,
    isArray: false
  })
  details?: Record<string, HealthIndicatorStatusDto>
}
