import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

export class DargahnoRequestException extends Error {
  public readonly config?: AxiosRequestConfig
  public readonly response?: AxiosResponse
  public readonly code?: string

  constructor(error: AxiosError | Error) {
    super(error.message)
    this.name = 'DargahnoRequestException'
    Object.setPrototypeOf(this, DargahnoRequestException.prototype)

    if (axios.isAxiosError(error)) {
      this.response = error.response
      this.config = error.config
      this.code = error.code
    }
  }
}

export class DargahnoValidatorException extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'DargahnoValidatorException'
    Object.setPrototypeOf(this, DargahnoValidatorException.prototype)
  }
}
