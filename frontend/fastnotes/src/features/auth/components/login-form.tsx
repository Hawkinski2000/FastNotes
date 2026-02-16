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
import GoogleLoginButton from './GoogleLoginButton'

type LoginFormProps = React.ComponentProps<typeof Card> & {
  logIn: (logInData: { email: string; password: string }) => void
  logInWithGoogle: (overrideConfig?: OverridableTokenClientConfig | undefined) => void
  loading: boolean
}

export default function LoginForm({ logIn, logInWithGoogle, loading, ...props }: LoginFormProps) {
  return (
    <div className="flex flex-col gap-6" {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()

              const formData = new FormData(e.currentTarget)

              const email = formData.get('email') as string
              const password = formData.get('password') as string

              logIn({ email, password })
            }}
          >
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" name="email" type="email" placeholder="m@example.com" required />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  {/* <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a> */}
                </div>
                <Input id="password" name="password" type="password" required />
              </Field>
              <Field>
                <Button type="submit">{loading ? 'Logging in...' : 'Login'}</Button>
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
