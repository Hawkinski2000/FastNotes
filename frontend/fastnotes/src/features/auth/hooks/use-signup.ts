import { useState } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '@/config/api'
import { logInUser } from '@/lib/api'
import { useAuth } from '@/lib/use-auth'

interface SignupData {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const useSignup = (setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
  const { setAccessToken } = useAuth()
  const [error, setError] = useState<string | null>(null)

  const signUp = async ({ username, email, password, confirmPassword }: SignupData) => {
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const recaptchaToken = 'recaptchaToken'

      await axios.post(
        `${API_BASE_URL}/users`,
        { username, email, password, recaptcha_token: recaptchaToken },
        { headers: { 'Content-Type': 'application/json' } },
      )

      const response = await logInUser(email, password)
      const token = response.data.access_token
      setAccessToken(token)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return { signUp, error }
}

export default useSignup
