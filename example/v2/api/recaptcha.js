import { useBody } from '@nuxt/h2'
import { $fetch } from 'ohmyfetch/node'

const SECRET_KEY = '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe' // Place your secret key here

export default async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  try {
    const { token } = await useBody(req)

    if (!token) {
      res.end(JSON.stringify({
        success: false,
        message: 'Invalid token'
      }))
      return
    }
    const response = await $fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${token}`
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
