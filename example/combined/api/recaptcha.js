import { useBody } from 'h3'
import { $fetch } from 'ohmyfetch/node'

/**
 * It is highly recommended to use enviroment variables instead of hardcoded secrets.
 */
const SECRET_KEYS = {
  '2': '6LecsLIaAAAAABd-yNkMXt_rf7GjWaxVJDlWryYy', // v2 secret key
  '3': '6LfembIaAAAAACcZlTsRvwf62fuCGXfR7e2HIj8S' // v3 secret key
}

/**
 * This is an example that demonstrates how verifying reCAPTCHA on the server side works.
 * Do not use this middleware in your production.
 */
export default async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  try {
    const { token, v } = await useBody(req)

    if (!SECRET_KEYS[v]) {
      res.end(JSON.stringify({
        success: false,
        message: 'Invalid version'
      }))
      return
    }

    if (!token) {
      res.end(JSON.stringify({
        success: false,
        message: 'Invalid token'
      }))
      return
    }
    const response = await $fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEYS[v]}&response=${token}`
    )

    if (response.success) {
      res.end(JSON.stringify({
        success: true,
        message: 'Token verifyed',
        response: response
      }))
    } else {
      res.end(JSON.stringify({
        success: false,
        message: 'Invalid token',
        response: response
      }))
    }
  } catch (e) {
    console.log('ReCaptcha error:', e)
    res.end(JSON.stringify({
      success: false,
      message: 'Internal error'
    }))
  }
}
