import { type ReactNode } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from '@/lib/auth-provider'

type AppProviderProps = {
  children: ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>{children}</AuthProvider>
    </GoogleOAuthProvider>
  )
}
