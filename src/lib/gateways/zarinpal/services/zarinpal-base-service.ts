import axios, { AxiosInstance } from 'axios'
import { Inject, Optional } from '@nestjs/common'
import { ZarinpalRequestException } from '../helpers/zarinpal.exceptions'
import { ZARINPAL_OPTIONS_TOKEN } from '../../../options/transifa-options.constants'
import { ZarinpalGatewayOptions } from '../../../config/interfaces/gateways/zarinpal.interfaces'
import {
  ZARINPAL_BASE_URL,
  ZARINPAL_GRAPHQL_URL,
  ZARINPAL_SANDBOX_BASE_URL,
  ZARINPAL_SANDBOX_GRAPHQL_URL,
} from '../zarinpal.constants'

export abstract class ZarinpalBaseService {
  private httpClient: AxiosInstance
  private graphqlClient: AxiosInstance

  constructor(
    @Optional() @Inject(ZARINPAL_OPTIONS_TOKEN) private readonly options: ZarinpalGatewayOptions,
  ) {
    this.setAxios()
  }

  protected get isActive() {
    return this.options?.isActive === undefined || this.options?.isActive
  }

  protected get httpBaseUrl() {
    return this.options?.sandbox ? ZARINPAL_SANDBOX_BASE_URL : ZARINPAL_BASE_URL
  }

  protected get graphqlBaseUrl() {
    return this.options?.sandbox ? ZARINPAL_SANDBOX_GRAPHQL_URL : ZARINPAL_GRAPHQL_URL
  }

  protected get paymentApi() {
    return `/pg/v4/payment/request.json`
  }

  protected get verifyApi() {
    return `/pg/v4/payment/verify.json`
  }

  protected get unverifiedApi() {
    return `/pg/v4/payment/unVerified.json`
  }

  protected get reverseApi() {
    return `/pg/v4/payment/reverse.json`
  }

  protected get inquiryApi() {
    return `/pg/v4/payment/inquiry.json`
  }

  protected get startPayApi() {
    return '/pg/StartPay/'
  }

  /**
   * Send a request to the Zarinpal API.
   * @param method - The HTTP method to use (POST or GET).
   * @param url - The URL to send the request to.
   * @param data - The data to send to the API.
   * @returns The response from the API as a generic type.
   */
  async request<T>(method: 'POST' | 'GET', url: string, data?: Record<string, any>) {
    try {
      const response = await this.httpClient.request<T>({
        method,
        url,
        data: {
          merchant_id: this.options?.merchantId,
          ...data,
        },
      })
      return response?.data
    } catch (error: unknown) {
      // const normalizedError = error instanceof Error ? error : new Error(String(error))
      // throw new ZarinpalRequestException(normalizedError)
      console.log(error)
      throw error
    }
  }

  /**
   * Send a request to the Zarinpal GraphQL API.
   * @param query - The GraphQL query to send.
   * @param variables - The variables to send to the query.
   * @returns The response from the API as a generic type.
   */
  async graphql<T>(query: string, variables?: Record<string, any>) {
    try {
      const response = await this.graphqlClient.post<T>('', {
        query,
        variables,
      })
      return response?.data
    } catch (error: unknown) {
      const normalizedError = error instanceof Error ? error : new Error(String(error))
      throw new ZarinpalRequestException(normalizedError)
    }
  }

  /*
    Private methods
  */
  private setAxios() {
    if (!this.isActive) return

    this.httpClient = axios.create({
      baseURL: this.httpBaseUrl,
      headers: {
        'User-Agent': 'ZarinPalSdk/v1 (NestJs)',
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })

    this.graphqlClient = axios.create({
      baseURL: this.graphqlBaseUrl,
      headers: {
        'User-Agent': 'ZarinPalSdk/v1 (NestJs)',
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${this.options?.accessToken}`,
      },
    })
  }
}
