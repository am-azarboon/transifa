import { Injectable } from '@nestjs/common'
import { IdPayBaseService } from './idpay-base-service'

@Injectable()
export class IdPayGatewayService extends IdPayBaseService {}
