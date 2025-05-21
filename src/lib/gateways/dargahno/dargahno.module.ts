import { Module } from '@nestjs/common'
import { DargahnoGatewayService } from './services/dargahno-gateway.service'
import { DARGAHNO_OPTIONS_TOKEN } from '../../options/transifa-options.constants'
import { DargahnoGatewayOptions } from '../../config/interfaces/gateways/dargahno.interfaces'

@Module({
  providers: [
    {
      provide: DargahnoGatewayService,
      useFactory: (options: DargahnoGatewayOptions) => {
        if (options && (options.isActive === undefined || options.isActive)) {
          return new DargahnoGatewayService(options)
        }
      },
      inject: [DARGAHNO_OPTIONS_TOKEN],
    },
  ],
  exports: [DargahnoGatewayService],
})
export class DargahnoModule {}
