import { AxiosInstance } from 'axios'
import { Inject, Optional } from '@nestjs/common'
import { IdPayGatewayOptions } from '../../../config/interfaces/gateways/id-pay.interfaces'
import { IDPAY_OPTIONS_TOKEN } from '../../../options/transifa-options.constants'

export abstract class IdPayBaseService {
  private httpClient: AxiosInstance

  constructor(
    @Optional() @Inject(IDPAY_OPTIONS_TOKEN) private readonly options: IdPayGatewayOptions,
  ) {}

  protected get isActive() {
    return this.options?.isActive === undefined || this.options?.isActive
  }
}
