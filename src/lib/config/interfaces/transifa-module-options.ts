import { DargahnoGatewayOptions } from './gateways/dargahno.interfaces'
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
     * Dargahno gateway options.
     */
    dargahno?: DargahnoGatewayOptions
  }
}
