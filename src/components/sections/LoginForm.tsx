import { useAuth } from '@/components/AuthContext'
import { FormProvider } from '@/components/FormProvider'
import { InputController } from '@/components/form/InputController'
import { LoginSchema } from '@/components/sections/schemas'
import { Button } from '@/components/ui/Button'
import { useLogin } from '@/queryHooks/useAuth'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { isAxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Input } from 'valibot'

type validateLoginSchema = Input<typeof LoginSchema>
const LoginForm = () => {
  const { mutate } = useLogin()
  const { login } = useAuth()
  const methods = useForm<validateLoginSchema>({
    resolver: valibotResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const submit = async (data: validateLoginSchema) => {
    await mutate(data, {
      onSuccess: ({ data }) => {
        login(data.data.accessToken)
        toast.success('Inicio de sesión exitoso')
      },
      onError: (error) => {
        if (isAxiosError(error)) {
          toast.error(error.response?.data?.data || 'Error al iniciar sesión')
        }
      },
    })
  }
  return (
    <FormProvider methods={methods} onSubmit={submit} className="flex flex-col space-y-4">
      <InputController name="email" label="Correo electrónico" />
      <InputController name="password" label="Contraseña" type="password" />
      <Button type="submit">Iniciar sesión</Button>
    </FormProvider>
  )
}

export default LoginForm
