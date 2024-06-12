import { FormProvider } from '@/components/FormProvider'
import { SelectController } from '@/components/form/SelectController'
import {
  CreateRelationClientAccountantSchema,
  CreateRelationClientAccountant,
} from '@/components/sections/schemas'
import { Button } from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import {
  useCreateRelationClientAccountant,
  useGetRelationByClientId,
} from '@/queryHooks/useClientAccountants'
import { useGetUsers } from '@/queryHooks/useUser'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { isAxiosError } from 'axios'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Input, Output } from 'valibot'

type validationSchemaCreateRelation = Input<typeof CreateRelationClientAccountantSchema>

type validationPropsCreateRelation = Output<typeof CreateRelationClientAccountant>

const VinculateClientForm = () => {
  const { data, isLoading } = useGetUsers({
    limit: 10,
    offset: 0,
    typeUser: 2,
    active: null,
  })
  const { data: dataAccountant } = useGetUsers({
    limit: 50,
    offset: 0,
    typeUser: 3,
    active: null,
  })

  const { mutate } = useCreateRelationClientAccountant()
  const methods = useForm<validationSchemaCreateRelation>({
    resolver: valibotResolver(CreateRelationClientAccountantSchema),
    defaultValues: {
      clientId: '',
      accountantId: '',
    },
  })

  const { watch } = methods
  const clientId = watch('clientId')

  const { data: dataRelation } = useGetRelationByClientId({ clientId })

  //take only available accountant for selected client
  const filteredAvailableAcc = useMemo(() => {
    if (dataRelation?.success && dataRelation?.data?.relationResult.length > 0) {
      return dataAccountant?.data.users.filter(
        (user) => !dataRelation?.data?.relationResult.find((item) => item.accountantId === user.id),
      )
    } else {
      return dataAccountant?.data.users
    }
  }, [dataRelation, dataAccountant])

  const submit = (data: Output<typeof CreateRelationClientAccountantSchema>) => {
    const params: validationPropsCreateRelation = {
      accountantId: parseInt(data.accountantId),
      clientId: parseInt(data.clientId),
    }
    mutate(params, {
      onSuccess: () => {
        toast.success('Relación creada correctamente')
        methods.reset()
      },
      onError: (error) => {
        if (isAxiosError(error)) {
          toast.error(error.response?.data?.message || 'Error al crear la relación')
        }
      },
    })
  }

  return (
    <>
      <div className="w-full max-w-xl rounded-xl border bg-card p-6 text-card-foreground shadow">
        <h3 className="pb-2 text-2xl font-semibold tracking-tight first:mt-0">Vincular usuario</h3>
        <FormProvider
          methods={methods}
          onSubmit={submit}
          className="flex flex-col space-y-4"
          autocomplete="off"
        >
          <SelectController
            name="clientId"
            label="Cliente a vincular"
            placeholder="Seleccione una opción"
            disabled={isLoading}
            values={
              data?.data.users.map((type) => ({
                value: `${type.id}`,
                label: type.name,
              })) || []
            }
          />

          {dataRelation && (
            <SelectController
              name="accountantId"
              label="Contador a vincular"
              placeholder="Seleccione una opción"
              disabled={isLoading}
              values={
                filteredAvailableAcc?.map((element) => ({
                  value: `${element.id}`,
                  label: element.name,
                })) || []
              }
            />
          )}

          <Button type="submit">Vincular cliente</Button>
        </FormProvider>
      </div>
      {dataRelation && (
        <Card className="w-full max-w-md">
          <h4 className="pb-2 text-2xl font-semibold tracking-tight first:mt-0">
            Contadores vinculados
          </h4>
          {dataRelation.data?.relationResult.map((relation) => (
            <p key={relation.id}>{relation.accountantName}</p>
          ))}
        </Card>
      )}
    </>
  )
}

export default VinculateClientForm
