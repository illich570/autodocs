import { Input } from '@/components/ui/Input'
import { forwardRef } from 'react'
import { NumericFormat, NumericFormatProps } from 'react-number-format'

export interface NumberFormatInputProps extends NumericFormatProps {
  fieldProps: {
    name: string
    value: string
    onChange: (value: string | number) => void
    onBlur: () => void
  }
}

const NumberFormatInput = forwardRef<HTMLInputElement, NumberFormatInputProps>(
  ({ className, fieldProps, decimalScale = 2, ...props }, ref) => {
    return (
      <NumericFormat
        customInput={Input}
        className={className}
        decimalScale={decimalScale}
        fixedDecimalScale
        thousandSeparator="."
        decimalSeparator=","
        getInputRef={ref}
        onValueChange={(values) => {
          fieldProps.onChange(values.value)
        }}
        onBlur={fieldProps.onBlur}
        value={fieldProps.value}
        name={fieldProps.name}
        {...props}
      />
    )
  },
)

NumberFormatInput.displayName = 'NumberFormatInput'

export { NumberFormatInput }
