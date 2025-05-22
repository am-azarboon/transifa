import { Injectable } from '@nestjs/common'
import { ZarinpalBaseService } from './zarinpal-base-service'
import { ZarinpalValidator } from '../helpers/zarinpal.validator'
import {
  ZarinpalCreatePaymentDto,
  ZarinpalCreatePaymentResponse,
  ZarinpalGetTransactionsDto,
  ZarinpalGetTransactionsResponse,
  ZarinpalGetUnverifiedResponse,
  ZarinpalInquireResponse,
  ZarinpalReverseResponse,
  ZarinpalVerifyPaymentDto,
  ZarinpalVerifyPaymentResponse,
} from '../dto/zarinpal-gateway.dto'

@Injectable()
export class ZarinpalGatewayService extends ZarinpalBaseService {
  /**
   * Create a payment request to Zarinpal.
   * @param data - The data to create a payment request.
   * @param data.currency - The currency of the payment request.
   * @param data.description - The description of the payment request.
   * @param data.amount - The amount of the payment request.
   * @param data.callbackUrl - The callback URL of the payment request.
   * @param data.mobile - Optional, The mobile number of the payment request.
   * @param data.email - Optional, The email of the payment request.
   * @param data.orderId - Optional, The order ID of the payment request.
   */
  public async create(data: ZarinpalCreatePaymentDto) {
    // Validate the data
    const newData = {
      currency: data.currency ?? 'IRR',
      description: data.description,
      amount: ZarinpalValidator.validateAmount(data.amount),
      callback_url: ZarinpalValidator.validateUrl(data.callbackUrl),
      mobile: ZarinpalValidator.validateMobile(data.mobile),
      email: ZarinpalValidator.validateEmail(data.email),
      order_id: data.orderId,
    }

    const res = await this.request<ZarinpalCreatePaymentResponse>('POST', this.paymentApi, newData)
    return {
      authority: res.data.authority,
      fee: res.data.fee,
      feeType: res.data.fee_type,
      code: res.data.code,
      message: res.data.message,
      errors: res.errors ?? null,
      redirectUrl: this.getRedirectUrl(res.data.authority),
    }
  }

  /**
   * Verify a payment request to Zarinpal.
   * @param data - The data to verify a payment request.
   * @param data.authority - The authority of the payment request from Zarinpal.
   * @param data.amount - The amount of the payment request.
   */
  public async verify(data: ZarinpalVerifyPaymentDto) {
    // Validate the data
    ZarinpalValidator.validateAuthority(data.authority)
    ZarinpalValidator.validateAmount(data.amount)

    const res = await this.request<ZarinpalVerifyPaymentResponse>('POST', this.verifyApi, data)
    return {
      code: res.data.code,
      message: res.data.message,
      cardHash: res.data.card_hash,
      cardPan: res.data.card_pan,
      refId: res.data.ref_id,
      feeType: res.data.fee_type,
      fee: res.data.fee,
      shaparakFee: res.data.shaparak_fee,
      errors: res.errors ?? null,
    }
  }

  /**
   * Inquire a payment request from Zarinpal.
   * @param authority - The authority of the payment request from Zarinpal.
   */
  public async inquire(authority: string) {
    // Validate the data
    ZarinpalValidator.validateAuthority(authority)

    const res = await this.request<ZarinpalInquireResponse>('POST', this.inquiryApi, { authority })
    return {
      code: res.data.code,
      message: res.data.message,
      status: res.data.status,
      errors: res.errors ?? [],
    }
  }

  /**
   * Reverse a payment request from Zarinpal.
   * @param authority - The authority of the payment request from Zarinpal.
   */
  public async reverse(authority: string) {
    // Validate the data
    ZarinpalValidator.validateAuthority(authority)

    const res = await this.request<ZarinpalReverseResponse>('POST', this.reverseApi, { authority })
    return {
      code: res.data.code ?? null,
      message: res.data.message ?? null,
      errors: res.errors ?? [],
    }
  }

  /**
   * Retrieve a list of last 100 unverified payments.
   */
  public async getUnverified() {
    const res = await this.request<ZarinpalGetUnverifiedResponse>('POST', this.unverifiedApi, {})
    return res.data
  }

  /**
   * Retrieve a list of transactions.
   * @param data - The data to retrieve a list of transactions.
   * @param data.terminalId - The terminal ID of the payment request from Zarinpal.
   * @param data.limit - Optional, The limit of the transactions.
   * @param data.offset - Optional, The offset of the transactions.
   */
  public async getTransactions(data: ZarinpalGetTransactionsDto) {
    // Validate the data
    ZarinpalValidator.validateLimit(data.limit)
    ZarinpalValidator.validateOffset(data.offset)

    const query = `
    query Sessions($terminal_id: ID!, $filter: String, $limit: Int, $offset: Int) {
      Session (terminal_id: $terminal_id, filter: $filter, limit: $limit, offset: $offset) {
        id,
        status,
        amount,
        description,
        created_at
      }
    }
    `
    const variables = { ...data, terminal_id: data.terminalId }
    const res = await this.graphql<ZarinpalGetTransactionsResponse>(query, variables)

    return {
      session: res.Session.map(session => ({
        id: session.id,
        status: session.status,
        amount: session.amount,
        description: session.description,
        createdAt: new Date(session.created_at),
      })),
    }
  }

  /**
   * Get the redirect URL for a payment request.
   * @param authority - The authority of the payment request from Zarinpal.
   */
  public getRedirectUrl(authority: string) {
    return `${this.httpBaseUrl}${this.startPayApi}${authority}`
  }
}
