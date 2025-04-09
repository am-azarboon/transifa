export interface IdPayGatewayOptions {
  /**
   * Whether the gateway is active and can be used.
   * @default true
   */
  isActive?: boolean

  /**
   * The 36 character merchant ID for the gateway.
   * Note: Use a random UUID for this if using sandbox mode.
   */
  merchantId: string

  /**
   * Whether the gateway is in sandbox mode
   * @default false
   */
  sandbox?: boolean
}
