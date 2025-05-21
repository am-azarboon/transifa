import { Module } from '@nestjs/common'
import { ConfigurableModuleClass } from './config/transifa-module-definition'
import { TransifaOptionsModule } from './options/transifa-options.module'
import { TransifaService } from './transifa/transifa.service'
import { ZarinpalModule } from './gateways/zarinpal/zarinpal.module'
import { DargahnoModule } from './gateways/dargahno/dargahno.module'

@Module({
  imports: [TransifaOptionsModule, ZarinpalModule, DargahnoModule],
  providers: [TransifaService],
  exports: [TransifaService],
})
export class TransifaModule extends ConfigurableModuleClass {}
