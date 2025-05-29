import axios, { AxiosInstance } from 'axios'
import { Inject, Optional } from '@nestjs/common'
import { DARGAHNO_BASE_URL } from '../dargahno.constants'
import { DargahnoLoginResponse } from '../dto/dargahno-gateway.dto'
import { CamelizeDeep, keysToCamelCase } from '../../../utils/object.utils'
import { DargahnoRequestException } from '../helpers/dargahno.exceptions'
import { DARGAHNO_OPTIONS_TOKEN } from '../../../options/transifa-options.constants'
import { DargahnoGatewayOptions } from '../../../config/interfaces/gateways/dargahno.interfaces'

export abstract class DargahnoBaseService {
  private httpClient: AxiosInstance
  private auth: CamelizeDeep<DargahnoLoginResponse>

  constructor(
    @Optional() @Inject(DARGAHNO_OPTIONS_TOKEN) private readonly options: DargahnoGatewayOptions,
  ) {
    this.setAxios()
  }

  protected get isActive() {
    return this.options?.isActive === undefined || this.options?.isActive
  }

  protected get username() {
    return this.options?.username
  }

  protected get password() {
    return this.options?.password
  }

  protected get loginApi() {
    return '/api/v2/auth/login'
  }

  protected get registerApi() {
    return '/api/v2/transaction/register'
  }

  protected get checkApi() {
    return '/api/v2/transaction/check'
  }

  protected get paymentInfoApi() {
    return '/api/v2/transaction/payment'
  }

  protected get transactionListApi() {
    return '/api/v2/transaction/list'
  }

  protected get invoiceNumberApi() {
    return '/api/v2/transaction/factor_number'
  }

  protected get verificationCodeShopMobileApi() {
    return '/api/v2/shop/verification_code_shop_mobile'
  }

  protected get verifyShopMobileApi() {
    return '/api/v2/shop/verify_shop_mobile'
  }

  protected get getShopMobilesApi() {
    return '/api/v2/shop/shopmobiles'
  }

  async request<T>(method: 'GET' | 'POST' | 'DELETE', url: string, data?: Record<string, any>) {
    await this.login()

    try {
      const response = await this.httpClient.request<T>({
        method,
        url,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.auth.accessToken}`,
        },
        data: {
          merchent_id: this.options?.merchantId, // This is a typing mistake from gateway creators!!
          ...data,
        },
        params: method === 'GET' ? data : undefined,
      })
      return response?.data
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new DargahnoRequestException(err)
      }
      throw new DargahnoRequestException(new Error(String(err)))
    }
  }

  async login(username: string = this.username, password: string = this.password) {
    if (this.auth && !this.isAuthExpired()) return

    try {
      const res = await this.httpClient.request<DargahnoLoginResponse>({
        method: 'POST',
        url: this.loginApi,
        headers: {
          Accept: 'application/json, application/x-www-form-urlencoded',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: { username, password },
      })

      const expiryTimestamp = Date.now() + res.data.expire_time * 60 * 1000
      this.auth = keysToCamelCase({ ...res.data, expiryTimestamp })

      return this.auth
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new DargahnoRequestException(err)
      }
      throw new DargahnoRequestException(new Error(String(err)))
    }
  }

  /*
    Private methods
  */
  private setAxios() {
    if (!this.isActive) return

    this.httpClient = axios.create({
      baseURL: DARGAHNO_BASE_URL,
      timeout: 10000,
    })
  }

  private isAuthExpired() {
    if (Date.now() >= this.auth.expiryTimestamp) {
      return true
    }
    return false
  }
}
