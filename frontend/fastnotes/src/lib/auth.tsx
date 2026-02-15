import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../features/auth/use-auth'
import { refreshAccessToken, isTokenExpired } from '../utils/auth'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { accessToken, setAccessToken } = useAuth()
  const [loading, setLoading] = useState(true)
  const [validToken, setValidToken] = useState<string | null>(null)

  useEffect(() => {
    const checkToken = async () => {
      let token: string | null = accessToken

      if (!accessToken || (accessToken && isTokenExpired(accessToken))) {
        token = await refreshAccessToken()
        if (token) {
          setAccessToken(token)
        }

        setValidToken(token)
        setLoading(false)
      }
    }

    checkToken()
  }, [accessToken, setAccessToken])

  if (loading) {
    return <div>Checking authentication...</div>
  }

  if (!validToken) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
