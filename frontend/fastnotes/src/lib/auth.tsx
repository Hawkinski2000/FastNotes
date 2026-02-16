import { useEffect, useRef, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/lib/use-auth'
import { refreshAccessToken, isTokenExpired } from '@/lib/api'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { accessToken, setAccessToken } = useAuth()
  const [loading, setLoading] = useState(true)
  const [validToken, setValidToken] = useState<string | null>(null)

  const tokenRef = useRef(accessToken)

  useEffect(() => {
    const checkToken = async () => {
      let token = tokenRef.current

      if (!token || isTokenExpired(token)) {
        try {
          token = await refreshAccessToken()
          if (token) setAccessToken(token)
        } catch (error) {
          console.error('Token refresh failed', error)
          token = null
        }
      }

      setValidToken(token)
      setLoading(false)
    }

    void checkToken()
  }, [setAccessToken])

  if (loading) {
    return <div>Checking authentication...</div>
  }

  if (!validToken) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
