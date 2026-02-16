import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { API_BASE_URL } from '@/config/api'

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
  } catch (error) {
    console.error('Failed to refresh access token', error)
    throw error
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
  } catch (error) {
    console.error('Failed to decode token', error)
    return true
  }
}

export const logInUser = async (emailString: string, passwordString: string) => {
  try {
    const formData = new FormData()
    formData.append('username', emailString)
    formData.append('password', passwordString)

    const response = await axios.post(`${API_BASE_URL}/tokens`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    })

    return response
  } catch (error) {
    console.error('logInUser failed:', error)
    throw error
  }
}
