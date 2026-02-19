import axios from 'axios'
import validator from 'validator'
import { API_BASE_URL } from '@/config/api'
import { logInUser } from '@/lib/api'
import { useAuth } from '@/lib/use-auth'

interface SignupData {
  email: string
  password: string
}

const useSignup = (
  setErrors: React.Dispatch<
    React.SetStateAction<{ email?: string; password?: string; form?: string }>
  >,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const { setAccessToken } = useAuth()

  const signUp = async ({ email, password }: SignupData) => {
    setErrors({})

    const currentErrors: { email?: string; password?: string } = {
      email: !validator.isEmail(email) ? 'Invalid email address.' : undefined,
      password: password.length < 8 ? 'Password must be at least 8 characters.' : undefined,
    }

    setLoading(true)

    try {
      if (!currentErrors.email) {
        const res = await axios.get(`${API_BASE_URL}/users/check-email`, { params: { email } })
        if (res.data.taken) currentErrors.email = 'Email is already registered.'
      }

      setErrors(currentErrors)

      if (Object.values(currentErrors).some(Boolean)) return

      const recaptchaToken = 'recaptchaToken'

      await axios.post(
        `${API_BASE_URL}/users`,
        { email, password, recaptcha_token: recaptchaToken },
        { headers: { 'Content-Type': 'application/json' } },
      )

      const response = await logInUser(email, password)
      const token = response.data.access_token
      setAccessToken(token)
    } catch {
      setErrors((prev) => ({ ...prev, form: 'Something went wrong. Please try again.' }))
    } finally {
      setLoading(false)
    }
  }

  return { signUp }
}

export default useSignup
