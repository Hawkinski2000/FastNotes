import { LoginForm } from '@/features/auth/components/login-form'
import BackgroundGrid from '@/components/background-grid'

export default function LoginPage() {
  return (
    <div className="flex w-full flex-1 items-center justify-center p-6 md:p-10">
      <BackgroundGrid />

      <div className="z-10 w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
