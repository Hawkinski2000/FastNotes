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

type LoginFormProps = React.ComponentProps<typeof Card> & {
  logIn: (logInData: { email: string; password: string }) => void
  errors: { email?: string | undefined; form?: string | undefined }
  setErrors: React.Dispatch<React.SetStateAction<{ email?: string; form?: string }>>
  logInWithGoogle: (overrideConfig?: OverridableTokenClientConfig | undefined) => void
  loading: boolean
}

export default function LoginForm({
  logIn,
  errors,
  setErrors,
  logInWithGoogle,
  loading,
  ...props
}: LoginFormProps) {
  const [formData, setFormData] = useState({ email: '', password: '' })

  const isButtonDisabled = !formData.email || !formData.password

  return (
    <div className="flex flex-col gap-6" {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Log in to your account</CardTitle>
          <CardDescription>Enter your information below to log in to your account</CardDescription>
        </CardHeader>

        <CardContent>
          <p
            className={`text-destructive h-0 opacity-0 transition-all ${
              errors.form && 'mb-1 h-5 opacity-100'
            }`}
          >
            {errors.form}
          </p>

          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault()
              logIn(formData)
            }}
          >
            <FieldGroup>
              <Field
                data-invalid={!!errors.email}
                className={`relative mt-5 duration-150 select-none ${errors.email && 'mb-5'}`}
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
                    if (errors.email || errors.form) {
                      setErrors({})
                    }
                  }}
                  autoComplete="email"
                />
                <FieldDescription
                  className={`text-destructive absolute top-full h-0 pt-2 opacity-0 transition-all select-text ${
                    errors.email && 'h-5 opacity-100'
                  }`}
                >
                  {errors.email}
                </FieldDescription>
              </Field>

              <Field className="select-none">
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  {/* <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a> */}
                </div>
                <PasswordInput
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value })
                    if (errors.email || errors.form) {
                      setErrors({})
                    }
                  }}
                  autoComplete="current-password"
                />
              </Field>

              <Field>
                <Button type="submit" disabled={isButtonDisabled}>
                  {loading ? 'Logging in...' : 'Log in'}
                </Button>

                <FieldSeparator className="my-2">Or</FieldSeparator>
                <GoogleLoginButton continueWithGoogle={logInWithGoogle} />

                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="/signup">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
