import { useState } from 'react'
import type { OverridableTokenClientConfig } from '@react-oauth/google'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldSeparator,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import PasswordInput from '@/components/password-input'
import GoogleLoginButton from './GoogleLoginButton'

type SignupFormProps = React.ComponentProps<typeof Card> & {
  signUp: (signUpData: { username: string; email: string; password: string }) => void
  errors: { email?: string | undefined; password?: string | undefined }
  setErrors: React.Dispatch<React.SetStateAction<{ email?: string; password?: string }>>
  loading: boolean
  logInWithGoogle: (overrideConfig?: OverridableTokenClientConfig | undefined) => void
}

export default function SignupForm({
  signUp,
  errors,
  setErrors,
  loading,
  logInWithGoogle,
  ...props
}: SignupFormProps) {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' })

  const isButtonDisabled = !formData.email || !formData.password

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Enter your information below to create your account</CardDescription>
      </CardHeader>

      <CardContent>
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault()
            signUp(formData)
          }}
        >
          <FieldGroup>
            <Field className="select-none">
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                autoComplete="username"
              />
            </Field>

            <Field
              data-invalid={!!errors.email}
              className={`relative duration-150 select-none ${errors.email && 'mb-5'}`}
            >
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value })
                  if (errors.email) {
                    setErrors((prev) => ({ ...prev, email: undefined }))
                  }
                }}
                autoComplete="email"
                aria-invalid={!!errors.email}
              />
              <FieldDescription
                className={`text-destructive absolute top-full h-0 pt-2 opacity-0 transition-all select-text ${
                  errors.email && 'h-5 opacity-100'
                }`}
              >
                {errors.email}
              </FieldDescription>
            </Field>

            <Field
              data-invalid={!!errors.password}
              className={`relative duration-150 select-none ${errors.password && 'mb-5'}`}
            >
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <PasswordInput
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value })
                  if (errors.password) {
                    setErrors((prev) => ({ ...prev, password: undefined }))
                  }
                }}
                autoComplete="new-password"
                aria-invalid={!!errors.password}
              />
              <FieldDescription
                className={`text-destructive absolute top-full h-0 pt-2 opacity-0 transition-all select-text ${
                  errors.password && 'h-5 opacity-100'
                }`}
              >
                {errors.password}
              </FieldDescription>
            </Field>

            <FieldGroup>
              <Field>
                <Button type="submit" disabled={isButtonDisabled}>
                  {loading ? 'Creating account...' : 'Create Account'}
                </Button>

                <FieldSeparator className="my-2">Or</FieldSeparator>
                <GoogleLoginButton continueWithGoogle={logInWithGoogle} />

                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="/login">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
