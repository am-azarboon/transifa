import { Optional } from '@nestjs/common'
import { ZarinpalGatewayService } from '../gateways/zarinpal/services/zarinpal-gateway.service'
import { DargahnoGatewayService } from '../gateways/dargahno/services/dargahno-gateway.service'

export abstract class TransifaBaseService {
  constructor(
    @Optional() private readonly zarinpalService: ZarinpalGatewayService,
    @Optional() private readonly dargahnoService: DargahnoGatewayService,
  ) {}

  public get zarinpal() {
    if (!this.zarinpalService) throw new Error('Zarinpal gateway is not configured.')
    return this.zarinpalService
  }

  public get dargahno() {
    if (!this.dargahnoService) throw new Error('Dargahno gateway is not configured.')
    return this.dargahnoService
  }
}
