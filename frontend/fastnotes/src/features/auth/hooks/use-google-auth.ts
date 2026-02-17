import axios from 'axios'
import { useGoogleLogin } from '@react-oauth/google'
import { API_BASE_URL } from '@/config/api'
import { useAuth } from '@/lib/use-auth'

const useGoogleAuth = (setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
  const { setAccessToken } = useAuth()

  const logInWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true)

      try {
        const response = await axios.post(
          `${API_BASE_URL}/tokens/google`,
          { access_token: tokenResponse.access_token },
          { withCredentials: true },
        )

        const token = response.data.access_token
        setAccessToken(token)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    },
  })

  return { logInWithGoogle }
}

export default useGoogleAuth
