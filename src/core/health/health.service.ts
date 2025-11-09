import { Injectable } from '@nestjs/common'
import {
  HealthCheckService,
  HealthCheckResult,
  MongooseHealthIndicator
} from '@nestjs/terminus'

@Injectable()
export class HealthService {
  constructor(
    private readonly health: HealthCheckService,
    private readonly db: MongooseHealthIndicator
  ) {}

  async checkAll(): Promise<HealthCheckResult> {
    return this.health.check([
      () =>
        this.db.pingCheck('mongodb_primary', {
          timeout: 1500
        })
      // * Add more health indicators here as needed
    ])
  }
}
