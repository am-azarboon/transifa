import {
  validateAmount,
  validateCallbackUrl,
  validateCurrency,
  validateEmail,
  validateMerchantId,
  validateMobile,
} from './validators.utils'

// Decorator to validate the merchant ID.
export function IsValidMerchantId(): PropertyDecorator {
  return (target: object, propertyKey: string | symbol) => {
    let value: string

    const getter = function () {
      return value
    }

    const setter = function (newValue: string) {
      // Validate the new value using the helper function
      validateMerchantId(newValue)
      value = newValue
    }

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    })
  }
}

// Decorator for validating amount with an optional minimum value.
export function IsValidAmount(min: number = 1000): PropertyDecorator {
  return (target: object, propertyKey: string | symbol) => {
    let value: number

    const getter = function () {
      return value
    }

    const setter = function (newValue: number) {
      validateAmount(newValue, min)
      value = newValue
    }

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    })
  }
}

// Decorator for validating URL.
export function IsUrl(): PropertyDecorator {
  return (target: object, propertyKey: string | symbol) => {
    let value: string

    const getter = function () {
      return value
    }

    const setter = function (newValue: string) {
      validateCallbackUrl(newValue)
      value = newValue
    }

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    })
  }
}

// Decorator for validating mobile number.
export function IsMobile(): PropertyDecorator {
  return (target: object, propertyKey: string | symbol) => {
    let value: string | null | undefined

    const getter = function () {
      return value
    }

    const setter = function (newValue?: string | null) {
      validateMobile(newValue)
      value = newValue
    }

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    })
  }
}

// Decorator for validating email.
export function IsEmail(): PropertyDecorator {
  return (target: object, propertyKey: string | symbol) => {
    let value: string | null | undefined

    const getter = function () {
      return value
    }

    const setter = function (newValue?: string | null) {
      validateEmail(newValue)
      value = newValue
    }

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    })
  }
}

// Decorator for validating currency.
export function IsValidCurrency(): PropertyDecorator {
  return (target: object, propertyKey: string | symbol) => {
    let value: string | null

    const getter = function () {
      return value
    }

    const setter = function (newValue: string | null) {
      validateCurrency(newValue)
      value = newValue
    }

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    })
  }
}

// // Decorator for validating filter.
// export function IsFilter(): PropertyDecorator {
//   return (target: object, propertyKey: string | symbol) => {
//     let value: string | null

//     const getter = function () {
//       return value
//     }

//     const setter = function (newValue: string | null) {
//       validateFilter(newValue)
//       value = newValue
//     }

//     Object.defineProperty(target, propertyKey, {
//       get: getter,
//       set: setter,
//       enumerable: true,
//       configurable: true,
//     })
//   }
// }

// // Decorator for validating limit.
// export function IsLimit(): PropertyDecorator {
//   return (target: object, propertyKey: string | symbol) => {
//     let value: number | null

//     const getter = function () {
//       return value
//     }

//     const setter = function (newValue: number | null) {
//       validateLimit(newValue)
//       value = newValue
//     }

//     Object.defineProperty(target, propertyKey, {
//       get: getter,
//       set: setter,
//       enumerable: true,
//       configurable: true,
//     })
//   }
// }

// // Decorator for validating offset.
// export function IsOffset(): PropertyDecorator {
//   return (target: object, propertyKey: string | symbol) => {
//     let value: number | null

//     const getter = function () {
//       return value
//     }

//     const setter = function (newValue: number | null) {
//       validateOffset(newValue)
//       value = newValue
//     }

//     Object.defineProperty(target, propertyKey, {
//       get: getter,
//       set: setter,
//       enumerable: true,
//       configurable: true,
//     })
//   }
// }

// // Decorator for validating card PAN.
// export function IsValidCardPan(): PropertyDecorator {
//   return (target: object, propertyKey: string | symbol) => {
//     let value: string | null

//     const getter = function () {
//       return value
//     }

//     const setter = function (newValue: string | null) {
//       validateCardPan(newValue)
//       value = newValue
//     }

//     Object.defineProperty(target, propertyKey, {
//       get: getter,
//       set: setter,
//       enumerable: true,
//       configurable: true,
//     })
//   }
// }

// // Decorator for validating method.
// export function IsMethod(): PropertyDecorator {
//   return (target: object, propertyKey: string | symbol) => {
//     let value: string

//     const getter = function () {
//       return value
//     }

//     const setter = function (newValue: string) {
//       validateMethod(newValue)
//       value = newValue
//     }

//     Object.defineProperty(target, propertyKey, {
//       get: getter,
//       set: setter,
//       enumerable: true,
//       configurable: true,
//     })
//   }
// }
