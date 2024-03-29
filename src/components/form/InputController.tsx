import { InputHTMLAttributes } from 'react'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { useFormContext } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label: string
  description?: string
  classNameItem?: string
}

const InputController = ({
  name,
  label,
  description,
  classNameItem,
  ...propsField
}: InputProps) => {
  const { control } = useFormContext()
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={classNameItem}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} {...propsField} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export { InputController }
