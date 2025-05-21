import { Global, Module } from '@nestjs/common'
import { MODULE_OPTIONS_TOKEN } from '../config/transifa-module-definition'
import { TransifaModuleOptions } from '../config/interfaces/transifa-module-options'
import { DARGAHNO_OPTIONS_TOKEN, ZARINPAL_OPTIONS_TOKEN } from './transifa-options.constants'

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
      provide: DARGAHNO_OPTIONS_TOKEN,
      useFactory: (options: TransifaModuleOptions) => {
        return options.gateways.dargahno
      },
      inject: [MODULE_OPTIONS_TOKEN],
    },
  ],
  exports: [ZARINPAL_OPTIONS_TOKEN, DARGAHNO_OPTIONS_TOKEN],
})
export class TransifaOptionsModule {}
