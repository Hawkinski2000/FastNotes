import axios from 'axios'
import validator from 'validator'
import { logInUser } from '@/lib/api'
import { useAuth } from '@/lib/use-auth'

interface LoginData {
  email: string
  password: string
}

const useLogin = (
  setErrors: React.Dispatch<React.SetStateAction<{ email?: string; form?: string }>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const { setAccessToken } = useAuth()

  const logIn = async ({ email, password }: LoginData) => {
    setErrors({})

    if (!validator.isEmail(email)) {
      setErrors({ email: 'Invalid email address.' })
      return
    }

    setLoading(true)

    try {
      const response = await logInUser(email, password)
      const token = response.data.access_token
      setAccessToken(token)
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 403) {
        setErrors({ form: 'Incorrect email or password.' })
      } else {
        setErrors({ form: 'Something went wrong. Please try again.' })
      }
    } finally {
      setLoading(false)
    }
  }

  return { logIn }
}

export default useLogin
