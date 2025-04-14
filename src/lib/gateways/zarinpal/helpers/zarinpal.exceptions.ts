import { AxiosError } from 'axios'

export class ZarinpalRequestException extends Error {
  constructor(error: AxiosError | Error) {
    super(error.message)
    this.name = 'ZarinpalRequestException'
    Object.setPrototypeOf(this, ZarinpalRequestException.prototype)
  }
}

export class ZarinpalValidatorException extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ZarinpalValidatorException'
    Object.setPrototypeOf(this, ZarinpalValidatorException.prototype)
  }
}
