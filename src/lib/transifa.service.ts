import { Injectable, Optional } from '@nestjs/common'
import { ZarinpalGatewayService } from './gateways/zarinpal/zarinpal-gateway.service'

@Injectable()
export class TransifaService {
  constructor(@Optional() private readonly zarinpalService: ZarinpalGatewayService) {}

  public get zarinpal() {
    if (!this.zarinpalService) throw new Error('Zarinpal gateway is not configured.')
    return this.zarinpalService
  }
}
