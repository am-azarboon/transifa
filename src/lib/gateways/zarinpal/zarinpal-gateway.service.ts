import { Injectable } from '@nestjs/common'
import { ZarinpalBaseService } from './interfaces/zarinpal-base-service'
import {
  ZarinpalCreatePaymentDto,
  ZarinpalCreatePaymentResponse,
  ZarinpalGetUnverifiedResponse,
  ZarinpalInquireResponse,
  ZarinpalReverseResponse,
  ZarinpalVerifyPaymentDto,
  ZarinpalVerifyPaymentResponse,
} from './dto/zarinpal-gateway.dto'

@Injectable()
export class ZarinpalGatewayService extends ZarinpalBaseService {
  /**
   * Create a payment request to Zarinpal.
   * @param {ZarinpalCreatePaymentDto} data - The data to create a payment request.
   */
  public async create(data: ZarinpalCreatePaymentDto) {
    const newData = {
      ...data,
      currency: data.currency ?? 'IRR',
      callback_url: data.callbackUrl,
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
   * @param {ZarinpalVerifyPaymentDto} data - The data to verify a payment request.
   */
  public async verify(data: ZarinpalVerifyPaymentDto) {
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
   * @param {string} authority - The authority of the payment request from Zarinpal.
   */
  public async inquire(authority: string) {
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
   * @param {string} authority - The authority of the payment request from Zarinpal.
   */
  public async reverse(authority: string) {
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
    return {
      code: res.data.code ?? null,
      message: res.data.message ?? null,
      authorities: res.data.authorities ?? [],
    }
  }

  /**
   * Get the redirect URL for a payment request.
   * @param {string} authority - The authority of the payment request from Zarinpal.
   */
  public getRedirectUrl(authority: string) {
    return `${this.httpBaseUrl}${this.startPayApi}${authority}`
  }
}
