import { AxiosError } from 'axios'

export class ZarinpalRequestException extends Error {
  constructor(error: AxiosError | Error) {
    super(error.message)
    this.name = 'ZarinpalRequestException'
    this.stack = error.stack
  }
}
