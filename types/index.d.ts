import Vue from 'vue'

export interface ReCaptchaOptions {
  /**
   * Toggles badge element visibility
   */
  hideBadge?: boolean

  /**
   * Site key to send requests
   */
  siteKey: string
}

export interface ReCaptchaResponse {
  /**
   * Verification token
   */
  token: string
}

export interface ReCaptchaInstance {
  /**
   * Options
   */
  options: ReCaptchaOptions

  /**
   * Returns a verify token
   * @param action
   */
  execute(action: string): Promise<ReCaptchaResponse>
}

declare module 'vue/types/vue' {
  interface Vue {
    $recaptcha: ReCaptchaInstance
  }
}
