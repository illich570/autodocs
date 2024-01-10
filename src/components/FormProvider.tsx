import { ReactNode } from 'react'
import { FieldValues, FormProvider as Form, SubmitHandler, UseFormReturn } from 'react-hook-form'

type FormProviderProps<TFormValues extends FieldValues> = {
  children: ReactNode
  onSubmit: SubmitHandler<TFormValues>
  methods: UseFormReturn<TFormValues>
  autocomplete: 'on' | 'off'
}
const FormProvider = <TFormValues extends FieldValues>({
  children,
  methods,
  onSubmit,
  autocomplete = 'on',
}: FormProviderProps<TFormValues>) => {
  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} autoComplete={autocomplete}>
        {children}
      </form>
    </Form>
  )
}

export { FormProvider }
