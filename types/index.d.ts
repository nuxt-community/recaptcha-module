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

export interface ReCaptchaInstance {
  /**
   * Options
   */
  options: ReCaptchaOptions

  /**
   * Initialize ReCaptcha
   * @param action
   */
  init(): Promise<any>

  /**
   * Returns a verify token
   * @param action
   */
  execute(action: string): Promise<string>
}

declare module 'vue/types/vue' {
  interface Vue {
    $recaptcha: ReCaptchaInstance
  }
}
