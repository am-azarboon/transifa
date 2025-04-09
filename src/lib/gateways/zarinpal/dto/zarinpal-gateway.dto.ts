import {
  IsEmail,
  IsMobile,
  IsValidAmount,
  IsValidCurrency,
  IsUrl,
} from '../../../common/utils/decorators.utils'

/*
  Requests
*/
export class ZarinpalCreatePaymentDto {
  @IsValidAmount()
  amount: number

  @IsValidCurrency()
  currency?: 'IRR' | 'IRT' = 'IRR'

  description: string

  @IsUrl()
  callbackUrl: string

  @IsMobile()
  mobile?: string

  @IsEmail()
  email?: string

  orderId?: string
}

export class ZarinpalVerifyPaymentDto {
  @IsValidAmount()
  amount: number

  authority: string
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
    authorities?: [
      {
        authority: string
        amount: number
        callback_url: string
        referer: string
        date: string
      }[],
    ]
  }
}
