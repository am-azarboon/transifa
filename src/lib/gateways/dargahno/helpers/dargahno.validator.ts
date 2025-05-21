import { DargahnoValidatorException } from './dargahno.exceptions'

export class DargahnoValidator {
  static uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

  static validateMerchantId(merchantId: string) {
    if (!DargahnoValidator.uuidRegex.test(merchantId)) {
      throw new DargahnoValidatorException('Invalid merchant_id format. It should be a valid UUID')
    }
    return merchantId
  }

  static validateAmount(amount: number) {
    if (amount < 100000) {
      throw new DargahnoValidatorException('Amount must be greater or equal to 100000 IRR')
    }
    return amount
  }

  static validateUrl(callbackUrl: string) {
    if (!/^https?:\/\/.*$/.test(callbackUrl)) {
      throw new DargahnoValidatorException('The Url should starts with http:// or https://')
    }
    return callbackUrl
  }

  static validateMobile(mobile?: string | null) {
    if (mobile && !/^09[0-9]{9}$/.test(mobile)) {
      throw new DargahnoValidatorException('Invalid mobile number format')
    }
    return mobile
  }

  static validateEmail(email?: string | null) {
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new DargahnoValidatorException('Invalid email format')
    }
    return email
  }
}
