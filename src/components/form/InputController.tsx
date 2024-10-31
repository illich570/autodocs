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
import { LucideIcon } from 'lucide-react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label: string
  description?: string
  classNameItem?: string
  Icon?: LucideIcon
}

const InputController = ({
  name,
  label,
  description,
  classNameItem,
  Icon,
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
            <div className="relative">
              <Input {...field} {...propsField} className={Icon ? 'pl-10' : ''} />
              {Icon && <Icon className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />}
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export { InputController }
