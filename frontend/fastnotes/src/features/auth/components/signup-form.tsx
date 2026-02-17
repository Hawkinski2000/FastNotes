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
  logInWithGoogle: (overrideConfig?: OverridableTokenClientConfig | undefined) => void
  loading: boolean
}

export default function SignupForm({
  signUp,
  logInWithGoogle,
  loading,
  ...props
}: SignupFormProps) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Enter your information below to create your account</CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault()

            const formData = new FormData(e.currentTarget)

            const username = formData.get('username') as string
            const email = formData.get('email') as string
            const password = formData.get('password') as string

            signUp({ username, email, password })
          }}
        >
          <FieldGroup>
            <Field className="select-none">
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input id="username" name="username" type="text" required />
            </Field>

            <Field className="select-none">
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                autoComplete="email"
              />
            </Field>

            <Field className="select-none">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <PasswordInput autoComplete="new-password" />
            </Field>

            <FieldGroup>
              <Field>
                <Button type="submit">{loading ? 'Creating account...' : 'Create Account'}</Button>
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
