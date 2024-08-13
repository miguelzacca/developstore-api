import { Module } from '@nestjs/common'
import { CommonServices } from './common.service.js'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [ConfigModule],
  providers: [CommonServices],
  exports: [CommonServices],
})
export class CommonModule {}
