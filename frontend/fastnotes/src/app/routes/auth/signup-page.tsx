import { SignupForm } from '@/features/auth/components/signup-form'
import BackgroundGrid from '@/components/background-grid'

export default function SignupPage() {
  return (
    <div className="flex w-full flex-1 items-center justify-center p-6 md:p-10">
      <BackgroundGrid />

      <div className="z-10 w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  )
}
