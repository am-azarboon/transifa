export function validateMerchantId(merchantId: string): void {
  if (!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(merchantId)) {
    throw new Error('Invalid merchant_id format. It should be a valid UUID.')
  }
}

export function validateAmount(amount: number, min: number = 1000): void {
  if (amount < min) {
    throw new Error(`Amount must be greater than ${min}.`)
  }
}

export function validateCallbackUrl(callbackUrl: string): void {
  if (!/^https?:\/\/.*$/.test(callbackUrl)) {
    throw new Error('Invalid callback URL format. It should start with http:// or https://.')
  }
}

export function validateMobile(mobile?: string | null): void {
  if (mobile && !/^09[0-9]{9}$/.test(mobile)) {
    throw new Error('Invalid mobile number format.')
  }
}

export function validateEmail(email?: string | null): void {
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('Invalid email format.')
  }
}

export function validateCurrency(currency?: string | null): void {
  const validCurrencies: string[] = ['IRR', 'IRT']
  if (currency && validCurrencies.indexOf(currency) === -1) {
    throw new Error('Invalid currency format. Allowed values are "IRR" or "IRT".')
  }
}

export function validateFilter(filter?: string | null): void {
  const validFilters: string[] = ['PAID', 'VERIFIED', 'TRASH', 'ACTIVE', 'REFUNDED']
  if (filter && validFilters.indexOf(filter) === -1) {
    throw new Error('Invalid filter value.')
  }
}

export function validateLimit(limit?: number | null): void {
  if (limit && limit <= 0) {
    throw new Error('Limit must be a positive integer.')
  }
}

export function validateOffset(offset?: number | null): void {
  if (offset && offset < 0) {
    throw new Error('Offset must be a non-negative integer.')
  }
}

export function validateCardPan(cardPan?: string | null): void {
  if (cardPan && !/^[0-9]{16}$/.test(cardPan)) {
    throw new Error('Invalid card PAN format. It should be a 16-digit number.')
  }
}

export function validateMethod(method: string): void {
  const validMethods: string[] = ['PAYA', 'CARD']
  if (validMethods.indexOf(method) === -1) {
    throw new Error('Invalid method. Allowed values are "PAYA" or "CARD".')
  }
}

export function validateReason(reason: string): void {
  const validReasons: string[] = [
    'CUSTOMER_REQUEST',
    'DUPLICATE_TRANSACTION',
    'SUSPICIOUS_TRANSACTION',
    'OTHER',
  ]
  if (validReasons.indexOf(reason) === -1) {
    throw new Error(
      'Invalid reason. Allowed values are "CUSTOMER_REQUEST", "DUPLICATE_TRANSACTION", "SUSPICIOUS_TRANSACTION", or "OTHER".',
    )
  }
}

export function validateWages(
  wages: Array<{ iban: string; amount: number; description: string }> | null,
): void {
  if (wages !== null) {
    for (const wage of wages) {
      if (!/^[A-Z]{2}[0-9]{2}[0-9A-Z]{1,30}$/.test(wage.iban)) {
        throw new Error('Invalid IBAN format in wages.')
      }
      if (wage.amount <= 0) {
        throw new Error('Wage amount must be greater than zero.')
      }
      if (wage.description.length > 255) {
        throw new Error('Wage description must be provided and less than 255 characters.')
      }
    }
  }
}
