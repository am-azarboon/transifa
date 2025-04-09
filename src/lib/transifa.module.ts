import { Module } from '@nestjs/common'
import { ConfigurableModuleClass } from './config/transifa-module-definition'
import { TransifaOptionsModule } from './options/transifa-options.module'
import { ZarinpalModule } from './gateways/zarinpal/zarinpal.module'
import { TransifaService } from './transifa.service'

@Module({
  imports: [TransifaOptionsModule, ZarinpalModule],
  providers: [TransifaService],
  exports: [TransifaService],
})
export class TransifaModule extends ConfigurableModuleClass {}
