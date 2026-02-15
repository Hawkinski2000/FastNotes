import { SignupForm } from '@/features/auth/components/signup-form'

export default function SignupPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          opacity: 0.4,
        }}
      />

      <div className="w-full max-w-sm pb-32">
        <SignupForm />
      </div>
    </div>
  )
}
