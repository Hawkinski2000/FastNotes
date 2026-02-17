import { useState } from 'react'
import { Field } from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

type PasswordInputProps = {
  autoComplete?: 'current-password' | 'new-password'
} & React.ComponentProps<typeof InputGroupInput>

export default function PasswordInput({
  autoComplete = 'current-password',
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Field className="max-w-sm">
      <InputGroup className="shadow-sm aria-invalid:ring-3 dark:bg-transparent" {...props}>
        <InputGroupInput
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          autoComplete={autoComplete}
          className="bg-transparent"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="icon-xs" onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? <EyeIcon /> : <EyeOffIcon />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
