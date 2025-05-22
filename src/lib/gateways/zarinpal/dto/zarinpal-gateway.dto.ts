/*
  Requests
*/
export class ZarinpalCreatePaymentDto {
  amount: number

  currency?: 'IRR' | 'IRT'

  description: string

  callbackUrl: string

  mobile?: string

  email?: string

  orderId?: string
}

export class ZarinpalVerifyPaymentDto {
  amount: number

  authority: string
}

export class ZarinpalGetTransactionsDto {
  terminalId: string

  filter?: 'PAID' | 'VERIFIED' | 'TRASH' | 'ACTIVE' | 'REFUNDED'

  limit?: number

  offset?: number
}

/*
  Responses
*/
export class ZarinpalCreatePaymentResponse {
  data: {
    authority: string
    fee: number
    fee_type: string
    code: number
    message: string
  }
  errors: Array<unknown> | object
}

export class ZarinpalVerifyPaymentResponse {
  data: {
    wages?: any
    code: number
    message: string
    card_hash?: string
    card_pan?: string
    ref_id: number
    fee_type: string
    fee: number
    shaparak_fee: number
    order_id?: number | string
  }
  errors: Array<unknown> | object
}

export class ZarinpalInquireResponse {
  data: {
    code: number
    message: string
    status: string
  }
  errors: Array<unknown> | object
}

export class ZarinpalReverseResponse {
  data: {
    code?: number
    message: string
  }
  errors: Array<unknown> | object
}

export class ZarinpalGetUnverifiedResponse {
  data: {
    code?: number
    message?: string
    authorities?: {
      authority: string
      amount: number
      callback_url: string
      referer: string
      date: string
    }[]
  }
}

export class ZarinpalGetTransactionsResponse {
  Session: {
    id: string
    status: string
    amount: number
    description: string
    created_at: string
  }[]
}
