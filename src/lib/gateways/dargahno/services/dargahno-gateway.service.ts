import { Injectable } from '@nestjs/common'
import { keysToCamelCase, keysToSnakeCase } from '../../../utils/object.utils'
import { DARGAHNO_PAY_BASE_URL } from '../dargahno.constants'
import { DargahnoBaseService } from './dargahno-base-service'
import { DargahnoValidator } from '../helpers/dargahno.validator'
import {
  DargahnoCreatePaymentDto,
  DargahnoCreatePaymentResponse,
  DargahnoGetListDto,
  DargahnoGetListResponse,
  DargahnoGetShopMobilesResponse,
  DargahnoVerifyPaymentDto,
  DargahnoVerifyResponse,
  DargahnoRegisterShopMobileDto,
  DargahnoVerifyShopMobileDto,
  DargahnoRegisterShopMobileResponse,
  DargahnoVerifyShopMobileResponse,
} from '../dto/dargahno-gateway.dto'

@Injectable()
export class DargahnoGatewayService extends DargahnoBaseService {
  /**
   * Register a Transaction.
   */
  async create(dto: DargahnoCreatePaymentDto) {
    const data = keysToSnakeCase(dto)

    // Validate some data
    DargahnoValidator.validateAmount(data.price)
    DargahnoValidator.validateUrl(data.callback_url)
    DargahnoValidator.validateMobile(data.mobile)

    const res = await this.request<DargahnoCreatePaymentResponse>('POST', this.registerApi, data)
    return keysToCamelCase({ ...res, redirectUrl: this.getRedirectUrl(res.authority) })
  }

  /**
   * Check a transaction status.
   */
  async verify(dto: DargahnoVerifyPaymentDto) {
    const data = {
      authority: dto.authority,
      new_price: String(dto.newPrice),
    }

    const res = await this.request<DargahnoVerifyResponse>('POST', this.checkApi, data)
    return keysToCamelCase(res)
  }

  /**
   * Get list of all transactions by given query filters.
   */
  async getTransactions(dto?: DargahnoGetListDto) {
    const data = keysToSnakeCase(dto)
    const res = await this.request<DargahnoGetListResponse>('GET', this.transactionListApi, data)

    return keysToCamelCase(res)
  }

  /**
   * Get last registered invoice(factor) number.
   */
  async invoiceNumber() {
    const res = await this.request<number>('GET', this.invoiceNumberApi, {})

    return keysToCamelCase(res)
  }

  /**
   * Request verification code for shop mobile.
   */
  async registerShopMobile(dto: DargahnoRegisterShopMobileDto) {
    const data = keysToSnakeCase(dto)
    return await this.request<DargahnoRegisterShopMobileResponse>(
      'POST',
      this.verificationCodeShopMobileApi,
      data,
    )
  }

  /**
   * Verify registered shop mobile.
   */
  async verifyShopMobile(dto: DargahnoVerifyShopMobileDto) {
    const data = keysToSnakeCase(dto)
    return await this.request<DargahnoVerifyShopMobileResponse>(
      'POST',
      this.verifyShopMobileApi,
      data,
    )
  }

  /**
   * Get all shop mobiles.
   * @param shopId string
   */
  async getShopMobiles(shopId: number) {
    const url = `${this.getShopMobilesApi}/${shopId}`
    const res = await this.request<DargahnoGetShopMobilesResponse['items']>('GET', url, {})

    return { items: keysToCamelCase(res) }
  }

  /**
   * Delete shop mobile.
   * @param mobile mobile number to delete
   */
  async deleteShopMobile(mobile: string) {
    const url = `${this.getShopMobilesApi}/${mobile}`
    const res = await this.request('DELETE', url, {})

    return keysToCamelCase(res)
  }

  /**
   * Get the redirect URL for a payment request.
   * @param authority - The authority of the payment request from Dargahno.
   */
  public getRedirectUrl(authority: string) {
    return `${DARGAHNO_PAY_BASE_URL}/?authority=${authority}`
  }
}
