import { Module } from '@nestjs/common'
import { ZarinpalGatewayOptions } from '../../config/interfaces/gateways/zarinpal.interfaces'
import { ZARINPAL_OPTIONS_TOKEN } from '../../options/transifa-options.constants'
import { ZarinpalGatewayService } from './zarinpal-gateway.service'

@Module({
  providers: [
    {
      provide: ZarinpalGatewayService,
      useFactory: (options: ZarinpalGatewayOptions) => {
        if (options && (options.isActive === undefined || options.isActive)) {
          return new ZarinpalGatewayService(options)
        }
      },
      inject: [ZARINPAL_OPTIONS_TOKEN],
    },
  ],
  exports: [ZarinpalGatewayService],
})
export class ZarinpalModule {}
