import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form'
import { NumberFormatInput } from '@/components/ui/NumberFormatInput'
import { useFormContext } from 'react-hook-form'
import { NumericFormatProps } from 'react-number-format'

export interface NumberFormatInputProps extends NumericFormatProps {
  name: string
  label: string
  description?: string
  classNameItem?: string
}

const NumberFormatController = ({
  name,
  label,
  description,
  classNameItem,
  ...propsField
}: NumberFormatInputProps) => {
  const { control } = useFormContext()
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={classNameItem}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <NumberFormatInput fieldProps={field} {...propsField} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export { NumberFormatController }
