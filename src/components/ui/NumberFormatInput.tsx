import { Input } from '@/components/ui/Input'
import { forwardRef } from 'react'
import { NumericFormat, NumericFormatProps } from 'react-number-format'

export interface NumberFormatInputProps extends NumericFormatProps {}

const NumberFormatInput = forwardRef<HTMLInputElement, NumberFormatInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <NumericFormat
        customInput={Input}
        className={className}
        decimalScale={2}
        fixedDecimalScale
        thousandSeparator="."
        decimalSeparator=","
        getInputRef={ref}
        {...props}
      />
    )
  },
)

NumberFormatInput.displayName = 'NumberFormatInput'

export { NumberFormatInput }
