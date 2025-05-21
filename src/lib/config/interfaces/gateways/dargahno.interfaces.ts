export interface DargahnoGatewayOptions {
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
   * Username for login process and getting Auth token.
   */
  username: string

  /**
   * Password for login process and getting Auth token.
   */
  password: string
}
