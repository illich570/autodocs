import { ReactNode } from 'react'
import { FieldValues, FormProvider as Form, SubmitHandler, UseFormReturn } from 'react-hook-form'

type FormProviderProps<TFormValues extends FieldValues> = {
  children: ReactNode
  onSubmit: SubmitHandler<TFormValues>
  methods: UseFormReturn<TFormValues>
  autocomplete?: 'on' | 'off'
  className?: string
}
const FormProvider = <TFormValues extends FieldValues>({
  children,
  methods,
  onSubmit,
  autocomplete = 'on',
  className,
}: FormProviderProps<TFormValues>) => {
  return (
    <Form {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        autoComplete={autocomplete}
        className={className}
      >
        {children}
      </form>
    </Form>
  )
}

export { FormProvider }
