import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/lib/use-auth'
import useSignup from '@/features/auth/hooks/use-signup'
import useGoogleAuth from '@/features/auth/hooks/use-google-auth'
import SignupForm from '@/features/auth/components/signup-form'
import BackgroundGrid from '@/components/background-grid'

export default function SignupPage() {
  const { accessToken } = useAuth()
  const navigate = useNavigate()
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [loading, setLoading] = useState(false)
  const { signUp } = useSignup(setErrors, setLoading)
  const { logInWithGoogle } = useGoogleAuth(setLoading)

  useEffect(() => {
    if (accessToken) navigate('/notes')
  }, [accessToken, navigate])

  return (
    <div className="flex w-full flex-1 items-center justify-center p-6 md:p-10">
      <BackgroundGrid />

      <div className="z-10 w-full max-w-sm">
        <SignupForm
          signUp={signUp}
          errors={errors}
          setErrors={setErrors}
          loading={loading}
          logInWithGoogle={logInWithGoogle}
        />
      </div>
    </div>
  )
}
