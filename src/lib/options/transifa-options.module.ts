import { Global, Module } from '@nestjs/common'
import { MODULE_OPTIONS_TOKEN } from '../config/transifa-module-definition'
import { TransifaModuleOptions } from '../config/interfaces/transifa-module-options'
import { IDPAY_OPTIONS_TOKEN, ZARINPAL_OPTIONS_TOKEN } from './transifa-options.constants'

@Global()
@Module({
  providers: [
    {
      provide: ZARINPAL_OPTIONS_TOKEN,
      useFactory: (options: TransifaModuleOptions) => {
        return options.gateways.zarinpal
      },
      inject: [MODULE_OPTIONS_TOKEN],
    },
    {
      provide: IDPAY_OPTIONS_TOKEN,
      useFactory: (options: TransifaModuleOptions) => {
        return options.gateways.idPay
      },
      inject: [MODULE_OPTIONS_TOKEN],
    },
  ],
  exports: [ZARINPAL_OPTIONS_TOKEN, IDPAY_OPTIONS_TOKEN],
})
export class TransifaOptionsModule {}
