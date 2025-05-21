/*
  Requests
*/
export class DargahnoCreatePaymentDto {
  price: number
  factorNumber: number
  callbackUrl: string
  shopId?: number
  mobile?: string
  email?: string
  description?: string
  category?: string
  notifyEndUser?: boolean
  cryptoAmount?: number
  cryptoName?: string
}

export class DargahnoVerifyPaymentDto {
  authority: string
  newPrice: number
}

export class DargahnoGetListDto {
  category?: string
  priceEqual?: number
  priceGreater?: number
  priceSmaller?: number
  newPriceEqual?: number
  newPriceGreater?: number
  newPriceSmaller?: number
  shopId?: number
  factorNumber?: number
  status?: number
  createDateTimeExact?: number // Timestamp
  createDateTimeGreater?: number // Timestamp
  createDateTimeSmaller?: number // Timestamp
  page?: number
  size?: number
}

/*
  Responses
*/
export class DargahnoLoginResponse {
  access_token: string
  token_type: string
  expire_time: number
  expiry_timestamp: number
  user_info: {
    merchentId: string
    role?: string
    accountState?: number
  }
}

export class DargahnoCreatePaymentResponse {
  authority: string
  shop_id: number
  new_price: number
  zarin_link?: string
  crypto_paylink?: string
  crypto_new_price?: string
}

export class DargahnoVerifyResponse {
  status: number
  factor_number: number
  authority: string
  validate: boolean
}

export class DargahnoGetListResponse {
  items: {
    id: number
    authority: string
    merchent_id: string
    shop_id: number
    price: number
    new_price: number
    factor_number: number
    callback_url: string
    status: number
    create_date_time: string
  }[]
  total: number
  page: number
  size: number
  pages: number
}
