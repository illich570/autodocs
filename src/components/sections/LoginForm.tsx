import { useAuth } from '@/contexts/AuthContext'
import { FormProvider } from '@/components/FormProvider'
import { InputController } from '@/components/form/InputController'
import { LoginSchema } from '@/components/sections/schemas'
import { Button } from '@/components/ui/Button'
import { useLogin } from '@/queryHooks/useAuth'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useRouter, useSearch } from '@tanstack/react-router'
import { isAxiosError } from 'axios'
import { LockIcon, MailIcon } from 'lucide-react'
import { useLayoutEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Input } from 'valibot'

type validateLoginSchema = Input<typeof LoginSchema>
const LoginForm = () => {
  const { mutate } = useLogin()
  const { login, isAuth } = useAuth()

  const router = useRouter()
  const search = useSearch({
    from: '/login',
  })

  useLayoutEffect(() => {
    if (search.redirect && isAuth) {
      router.history.push(search.redirect)
    } else if (isAuth) {
      router.history.push('/dashboard')
      toast.success('Sesión iniciada')
    }
  }, [search.redirect, isAuth, router])

  const methods = useForm<validateLoginSchema>({
    resolver: valibotResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const submit = async (data: validateLoginSchema) => {
    mutate(data, {
      onSuccess: ({ data }) => {
        login(data.data.accessToken)
        router.invalidate()
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
      <InputController name="email" label="Correo electrónico" Icon={MailIcon} />
      <InputController name="password" label="Contraseña" type="password" Icon={LockIcon} />
      <Button type="submit">Iniciar sesión</Button>
    </FormProvider>
  )
}

export default LoginForm
