import { logInUser } from '@/lib/api'
import { useAuth } from '@/lib/use-auth'

interface LoginData {
  email: string
  password: string
}

const useLogin = (setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
  const { setAccessToken } = useAuth()

  const logIn = async ({ email, password }: LoginData) => {
    setLoading(true)

    try {
      const response = await logInUser(email, password)
      const token = response.data.access_token
      setAccessToken(token)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return { logIn }
}

export default useLogin
