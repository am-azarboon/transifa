import { Module } from '@nestjs/common'
import { IdPayGatewayService } from './services/idpay-gateway.service'
import { IdPayGatewayOptions } from '../../config/interfaces/gateways/id-pay.interfaces'
import { IDPAY_OPTIONS_TOKEN } from '../../options/transifa-options.constants'

@Module({
  providers: [
    {
      provide: IdPayGatewayService,
      useFactory: (options: IdPayGatewayOptions) => {
        if (options && (options.isActive === undefined || options.isActive)) {
          return new IdPayGatewayService(options)
        }
      },
      inject: [IDPAY_OPTIONS_TOKEN],
    },
  ],
  exports: [IdPayGatewayService],
})
export class IdPayModule {}
