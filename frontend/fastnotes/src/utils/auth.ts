import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { API_BASE_URL } from '../config/api'

export const refreshAccessToken = async () => {
  try {
    const refreshResponse = await axios.post(
      `${API_BASE_URL}/tokens/refresh`,
      {},
      { withCredentials: true },
    )
    const newToken = refreshResponse.data.access_token
    if (newToken) {
      return newToken
    }
  } catch (err) {
    console.error('Failed to refresh access token', err)
  }
}

interface JwtPayload {
  user_id: number
  exp: number
}

export const isTokenExpired = (token: string) => {
  try {
    const decoded = jwtDecode<JwtPayload>(token)

    const now = Date.now() / 1000
    return decoded.exp < now
  } catch (err) {
    console.error('Failed to decode token', err)
    return true
  }
}
