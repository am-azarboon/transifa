import { IdPayGatewayOptions } from './gateways/id-pay.interfaces'
import { ZarinpalGatewayOptions } from './gateways/zarinpal.interfaces'

/**
 * Transifa module options
 */
export interface TransifaModuleOptions {
  gateways: {
    /**
     * Zarinpal gateway options.
     */
    zarinpal?: ZarinpalGatewayOptions

    /**
     * Id Pay gateway options.
     */
    idPay?: IdPayGatewayOptions
  }
}
