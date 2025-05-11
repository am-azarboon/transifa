import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

export class ZarinpalRequestException extends Error {
  public readonly config?: AxiosRequestConfig
  public readonly response?: AxiosResponse
  public readonly code?: string

  constructor(error: AxiosError | Error) {
    super(error.message)
    this.name = 'ZarinpalRequestException'
    Object.setPrototypeOf(this, ZarinpalRequestException.prototype)

    if (axios.isAxiosError(error)) {
      this.response = error.response
      this.config = error.config
      this.code = error.code
    }
  }
}

export class ZarinpalValidatorException extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ZarinpalValidatorException'
    Object.setPrototypeOf(this, ZarinpalValidatorException.prototype)
  }
}
