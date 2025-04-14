import { Module } from '@nestjs/common'
import { ZarinpalValidator } from './helpers/zarinpal.validator'
import { ZarinpalGatewayService } from './services/zarinpal-gateway.service'
import { ZARINPAL_OPTIONS_TOKEN } from '../../options/transifa-options.constants'
import { ZarinpalGatewayOptions } from '../../config/interfaces/gateways/zarinpal.interfaces'

@Module({
  providers: [
    {
      provide: ZarinpalGatewayService,
      useFactory: (options: ZarinpalGatewayOptions) => {
        if (options && (options.isActive === undefined || options.isActive)) {
          ZarinpalValidator.validateMerchantId(options.merchantId)
          return new ZarinpalGatewayService(options)
        }
      },
      inject: [ZARINPAL_OPTIONS_TOKEN],
    },
  ],
  exports: [ZarinpalGatewayService],
})
export class ZarinpalModule {}
