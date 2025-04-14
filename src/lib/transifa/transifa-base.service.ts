import { Optional } from '@nestjs/common'
import { ZarinpalGatewayService } from '../gateways/zarinpal/services/zarinpal-gateway.service'

export abstract class TransifaBaseService {
  constructor(@Optional() private readonly zarinpalService: ZarinpalGatewayService) {}

  public get zarinpal() {
    if (!this.zarinpalService) throw new Error('Zarinpal gateway is not configured.')
    return this.zarinpalService
  }
}
