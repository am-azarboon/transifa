# Transifa

A NestJS package to interact with various payment gateways. Currently supports Zarinpal gateway with plans to add more gateways in the future.

## Installation

Using npm:

```bash
npm install transifa
```

Using yarn:

```bash
yarn add transifa
```

## Configuration

### Basic Setup

You can configure the `TransifaModule` in two ways:

#### 1. Using register (Synchronous)

```typescript
import { Module } from '@nestjs/common'
import { TransifaModule } from 'transifa'

@Module({
  imports: [
    TransifaModule.register({
      gateways: {
        zarinpal: {
          merchantId: 'YOUR_MERCHANT_ID', // Required: 36 character merchant ID
          accessToken: 'YOUR_ACCESS_TOKEN', // Optional: Required for specific operations
          sandbox: false, // Optional: Set to true for testing
          isActive: true, // Optional: Defaults to true
        },
        dargahno: {
          merchantId: 'YOUR_MERCHANT_ID', // Required: 36 character merchant ID
          username: 'YOUR_PANEL_USERNAME', // Required: Usually its your mobile number
          password: 'YOUR_PANEL_PASSWORD', // Required
          isActive: true, // Optional: Defaults to true
        },
      },
    }),
  ],
})
export class AppModule {}
```

#### 2. Using registerAsync (Asynchronous)

```typescript
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TransifaModule } from 'transifa'

@Module({
  imports: [
    TransifaModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        gateways: {
          zarinpal: {
            merchantId: configService.get('ZARINPAL_MERCHANT_ID'),
            accessToken: configService.get('ZARINPAL_ACCESS_TOKEN'),
            sandbox: configService.get('NODE_ENV') === 'development',
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
```

## Usage

### Injecting the Service

Inject the `TransifaService` into your service or controller:

```typescript
import { Injectable } from '@nestjs/common'
import { TransifaService } from 'transifa'

@Injectable()
export class PaymentService {
  constructor(private readonly transifa: TransifaService) {}
}
```

### Zarinpal Gateway

The Zarinpal gateway provides the following methods:

#### Create Payment

```typescript
const payment = await this.transifa.zarinpal.create({
  amount: 100000, // Amount in Rials
  description: 'Payment for order #123',
  callbackUrl: 'https://your-domain.com/payment/callback',
  mobile: '09123456789', // Optional
  email: 'user@example.com', // Optional
  orderId: '123', // Optional
  currency: 'IRR', // Optional, defaults to 'IRR'
})

// Redirect user to payment page
return { redirectUrl: payment.redirectUrl }
```

#### Verify Payment

```typescript
const verification = await this.transifa.zarinpal.verify({
  authority: 'A000000000000000000000000000000000000',
  amount: 100000,
})

if (verification.code === 100) {
  // Payment was successful
  console.log('Payment verified:', verification.refId)
} else {
  // Payment failed
  console.error('Payment verification failed:', verification.message)
}
```

#### Additional Methods

- `inquire(authority: string)`: Check the status of a payment
- `reverse(authority: string)`: Reverse a payment
- `getUnverified()`: Get a list of unverified payments
- `getTransactions(data: ZarinpalGetTransactionsDto)`: Get a list of transactions

#### Official Documentation
To get more information about API (e.g. error status codes) refer to [official documentation](https://www.zarinpal.com/docs/paymentGateway/).

---

### Dargahno Gateway

Dargahno is an Iranian online payment provider that offers a card-to-card payment gateway (no banking license or e-Namad required) as well as support for redirecting users to conventional bank gateways via payment links. In the card-to-card flow, buyers are shown the seller’s card number and transfer the amount from their mobile/internet banking; Dargahno then automatically confirms the deposit and notifies the merchant.

The Dargahno gateway provides the following methods:

#### Create Payment

```typescript
const payment = await this.transifa.dargahno.create({
  price: 100000, // Amount in Rials
  factorNumber: 123, // Your unique invoice number
  callbackUrl: 'https://your-domain.com/payment/callback',
  mobile: '09123456789', // Optional
  description: 'Payment for order #123', // Optional
  // Other optional data...
})

// Redirect user to payment page
return { redirectUrl: payment.redirectUrl }
```

#### Verify Payment

```typescript
const verification = await this.transifa.dargahno.verify({
  authority: 'A000000000000000000000000000000000000',
  newPrice: 100000, // The final amount to be verified
})

if (verification.status === 1) {
  // Payment was successful
  console.log('Payment verified:', verification.factorNumber)
}
```

#### Additional Methods

- `getTransactions()`: Get a list of transactions with optional filtering.
- `invoiceNumber()`: Get the last registered invoice (factor) number.
- `registerShopMobile()`: Register a new mobile number for a shop and get verification code.
- `verifyShopMobile()`: Verify registered mobile with given code.
- `getShopMobiles()`: Get list of all mobiles for a specific shop. 

---

## Supported Gateways

| Gateway  | Status     | Tested |
| :------- | :--------- | :----- |
| Zarinpal | ✅ Added   | ✅ Yes |
| Dargahno | ✅ Added   | ✅ Yes |
| IdPay    | 🚧 Planned | ❌ No  |

## License

This project is licensed under the MIT License - see the LICENSE file for details.
