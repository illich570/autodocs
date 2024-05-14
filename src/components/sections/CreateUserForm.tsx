import { FormProvider } from '@/components/FormProvider'
import { InputController } from '@/components/form/InputController'
import { SelectController } from '@/components/form/SelectController'
import { CreateUserSchema, CreateUserParams } from '@/components/sections/schemas'
import { Button } from '@/components/ui/Button'
import { useGetTypeUsers } from '@/queryHooks/useTypeUsers'
import { useCreateUser } from '@/queryHooks/useUser'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { isAxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Input, Output } from 'valibot'

type validationSchemaCreateUser = Input<typeof CreateUserSchema>

type validationPropsCreateUser = Output<typeof CreateUserParams>

const CreateUserForm = () => {
  const { data, isLoading } = useGetTypeUsers()
  const { mutate } = useCreateUser()
  const methods = useForm<validationSchemaCreateUser>({
    resolver: valibotResolver(CreateUserSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      typeUserId: '',
    },
  })

  const submit = (data: Output<typeof CreateUserSchema>) => {
    const params: validationPropsCreateUser = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      typeUserId: parseInt(data.typeUserId),
    }
    mutate(params, {
      onSuccess: () => {
        toast.success('Usuario creado correctamente')
        methods.reset()
      },
      onError: (error) => {
        if (isAxiosError(error)) {
          toast.error(error.response?.data?.message || 'Error al generar el documento')
        }
      },
    })
  }

  return (
    <div className="max-w-xl rounded-xl border bg-card p-6 text-card-foreground shadow">
      <h3 className="pb-2 text-2xl font-semibold tracking-tight first:mt-0">Creación de usuario</h3>
      <FormProvider
        methods={methods}
        onSubmit={submit}
        className="flex flex-col space-y-4"
        autocomplete="off"
      >
        <InputController name="firstName" label="Nombre" type="text" />
        <InputController name="lastName" label="Apellido" type="text" />
        <InputController name="email" label="Correo" type="email" />
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
          <InputController
            name="password"
            label="Contraseña"
            type="password"
            autoComplete="new-password"
          />
          <InputController name="confirmPassword" label="Confirmar contraseña" type="password" />
        </div>

        <SelectController
          name="typeUserId"
          label="Tipo de usuario"
          placeholder="Seleccione una opción"
          disabled={isLoading}
          values={
            data?.data.typeUsers.map((type) => ({
              value: `${type.id}`,
              label: type.name,
            })) || []
          }
          classNameItem="flex-0"
        />
        <Button type="submit">Crear usuario</Button>
      </FormProvider>
    </div>
  )
}

export default CreateUserForm
