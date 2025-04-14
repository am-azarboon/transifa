import { ZarinpalValidatorException } from './zarinpal.exceptions'

export class ZarinpalValidator {
  public static validateMerchantId(merchantId: string) {
    if (!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(merchantId)) {
      throw new ZarinpalValidatorException('Invalid merchant_id format. It should be a valid UUID')
    }
    return merchantId
  }

  public static validateAmount(amount: number) {
    if (amount < 1000) {
      throw new ZarinpalValidatorException('Amount must be greater or equal to 1000')
    }
    return amount
  }

  public static validateCurrency(currency: string) {
    if (currency !== 'IRR' && currency !== 'IRT') {
      throw new ZarinpalValidatorException('Currency must be IRR or IRT')
    }
    return currency
  }

  public static validateUrl(callbackUrl: string) {
    if (!/^https?:\/\/.*$/.test(callbackUrl)) {
      throw new ZarinpalValidatorException('The Url should starts with http:// or https://')
    }
    return callbackUrl
  }

  public static validateAuthority(authority: string) {
    if (!/^[AS][0-9a-zA-Z]{35}$/.test(authority)) {
      throw new ZarinpalValidatorException(
        'Invalid authority format. It should starts with "A" or "S" followed by 35 alphanumeric characters',
      )
    }
    return authority
  }

  public static validateLimit(limit?: number | null) {
    if (limit && limit <= 0) {
      throw new ZarinpalValidatorException('Limit must be a positive integer')
    }
    return limit
  }

  public static validateOffset(offset?: number | null) {
    if (offset && offset < 0) {
      throw new ZarinpalValidatorException('Offset must be a non-negative integer')
    }
    return offset
  }

  public static validateMobile(mobile?: string | null) {
    if (mobile && !/^09[0-9]{9}$/.test(mobile)) {
      throw new ZarinpalValidatorException('Invalid mobile number format')
    }
    return mobile
  }

  public static validateEmail(email?: string | null) {
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new ZarinpalValidatorException('Invalid email format')
    }
    return email
  }

  public static validateCardPan(cardPan?: string | null) {
    if (cardPan && !/^[0-9]{16}$/.test(cardPan)) {
      throw new ZarinpalValidatorException(
        'Invalid card PAN format. It should be a 16-digit number.',
      )
    }
    return cardPan
  }

  public static validateMethod(method: string) {
    const validMethods: string[] = ['PAYA', 'CARD']
    if (validMethods.indexOf(method) === -1) {
      throw new ZarinpalValidatorException('Invalid method. Allowed values are "PAYA" or "CARD"')
    }
    return method
  }

  public static validateReason(reason: string) {
    const validReasons: string[] = [
      'CUSTOMER_REQUEST',
      'DUPLICATE_TRANSACTION',
      'SUSPICIOUS_TRANSACTION',
      'OTHER',
    ]
    if (validReasons.indexOf(reason) === -1) {
      throw new ZarinpalValidatorException(
        'Invalid reason. Allowed values are "CUSTOMER_REQUEST", "DUPLICATE_TRANSACTION", "SUSPICIOUS_TRANSACTION", or "OTHER"',
      )
    }
    return reason
  }

  public static validateWages(
    wages: Array<{ iban: string; amount: number; description: string }> | null,
  ) {
    if (wages !== null) {
      for (const wage of wages) {
        if (!/^[A-Z]{2}[0-9]{2}[0-9A-Z]{1,30}$/.test(wage.iban)) {
          throw new ZarinpalValidatorException('Invalid IBAN format in wages')
        }
        if (wage.amount <= 0) {
          throw new ZarinpalValidatorException('Wage amount must be greater than zero')
        }
        if (wage.description.length > 255) {
          throw new ZarinpalValidatorException(
            'Wage description must be provided and less than 255 characters',
          )
        }
      }
    }
    return wages
  }
}
