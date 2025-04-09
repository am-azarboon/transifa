import { ConfigurableModuleBuilder } from '@nestjs/common'
import { TransifaModuleOptions } from './interfaces/transifa-module-options'

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN, ASYNC_OPTIONS_TYPE, OPTIONS_TYPE } =
  new ConfigurableModuleBuilder<TransifaModuleOptions>()
    .setClassMethodName('register')
    .setFactoryMethodName('createTransifaOptions')
    .setExtras({}, (definitions, extras) => ({
      ...definitions,
      exports: [MODULE_OPTIONS_TOKEN],
      global: true,
    }))
    .build()
