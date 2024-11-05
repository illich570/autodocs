import { Button } from '@/components/ui/Button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form'
import { Calendar } from '@/components/ui/Calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { DayPickerBase } from 'react-day-picker'
import { useFormContext } from 'react-hook-form'
import { es } from 'date-fns/locale'

interface DatePickerControllerProps extends DayPickerBase {
  label: string
  name: string
  description?: string
  classNameItem?: string
}
const DatePickerController = ({
  label,
  name,
  description,
  classNameItem,
  ...propsField
}: DatePickerControllerProps) => {
  const { control } = useFormContext()
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('flex flex-col', classNameItem)}>
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-full pl-3 text-left font-normal lg:w-[240px]',
                    !field.value && 'text-muted-foreground',
                  )}
                >
                  {field.value ? (
                    format(field.value, 'PPP', { locale: es })
                  ) : (
                    <span>Selec. una fecha</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                {...propsField}
                locale={es}
              />
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}

          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export { DatePickerController }
