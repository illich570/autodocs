import { valibotResolver } from '@hookform/resolvers/valibot'
import { useForm } from 'react-hook-form'
import { object, string, Output, minLength } from 'valibot'
import { FormProvider } from '@/components/FormProvider'
import { InputController } from '@/components/form/InputController'
import { Button } from '@/components/ui/Button'
import { SelectController } from '@/components/form/SelectController'
import { NumberFormatController } from '@/components/form/NumberFormatController'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table'
import { useState } from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/Tooltip'
import { DeleteIcon } from 'lucide-react'

export type Iamounts = {
  amount: string
  amountExchange: string
  id: number
}

const CertificateForm = () => {
  const [amounts, setAmounts] = useState<Iamounts[]>([])

  const schema = object({
    username: string([minLength(1, 'El nombre de usuario es requerido')]),
    workActivity: string([minLength(1, 'La actividad laboral es requerida')]),
    reasonDocument: string([minLength(1, 'La razón del documento es requerida')]),
    addressedName: string([minLength(1, 'El nombre del receptor es requerido')]),
    holderId: string([minLength(1, 'El numero de identificación es requerido')]),
    holderName: string([minLength(1, 'El nombre del titular es requerido')]),
    revisionReasons: string([minLength(1, 'La razón de revisión es requerida')]),
    sex: string([minLength(1, 'El sexo es requerido')]),
    currency: string([minLength(1, 'La moneda es requerida')]),
    securityNumber: string([minLength(1, 'El numero de hoja de seguridad es requerido')]),
    amount: string(),
    amountExchange: string(),
  })

  type validationSchema = Output<typeof schema>

  const methods = useForm<validationSchema>({
    resolver: valibotResolver(schema),
    defaultValues: {
      username: '',
      workActivity: '',
      reasonDocument: '',
      addressedName: '',
      holderId: '',
      holderName: '',
      revisionReasons: '',
      sex: '',
      currency: '',
      securityNumber: '',
      amount: '',
      amountExchange: '',
    },
  })

  const { setValue, getValues } = methods

  const handleAddAmount = () => {
    setAmounts((prev) => [
      ...prev,
      {
        amount: getValues('amount'),
        amountExchange: getValues('amountExchange'),
        id: prev.length === 0 ? 1 : prev[prev.length - 1].id + 1,
      },
    ])
    setValue('amount', '')
    setValue('amountExchange', '')
  }

  const handleRemoveAmount = (id: number) => {
    setAmounts((prev) => prev.filter((amount) => amount.id !== id))
  }

  const submit = (data: validationSchema) => {
    console.log(data)
  }
  return (
    <div className="max-w-xl rounded-xl border bg-card p-6 text-card-foreground shadow">
      <h3 className="pb-2 text-2xl font-semibold tracking-tight first:mt-0">
        Generar certificación de ingresos
      </h3>
      <FormProvider methods={methods} onSubmit={submit} className="flex flex-col space-y-4">
        <InputController name="holderName" label="Nombre del titular" type="text" />
        <InputController name="holderId" label="Numero de Identificacion" type="text" />
        <SelectController
          name="sex"
          label="Sexo"
          placeholder="Seleccione una opción"
          values={[
            { value: 'M', label: 'Masculino' },
            { value: 'F', label: 'Femenino' },
          ]}
        />
        <InputController
          name="addressedName"
          label="Nombre del receptor"
          description="A quien va dirigido el documento"
          type="text"
        />
        <InputController
          name="workActivity"
          label="Actividad laboral"
          description="Actividad que realiza el titular"
          type="text"
        />
        <InputController
          name="reasonDocument"
          label="Razón de certificación"
          description="Finalidad del documento"
          type="text"
        />
        <InputController
          name="revisionReasons"
          label="Elementos revisados"
          description="Razones o elementos revisados"
          type="text"
        />
        <SelectController
          name="currency"
          label="Moneda"
          placeholder="Seleccione una opción"
          values={[
            { value: 'BS', label: 'Bs. (Bolivares)' },
            { value: 'USD', label: '$ (Dolares', disabled: true },
          ]}
        />
        <InputController
          name="securityNumber"
          label="Núm. de Hoja de Seguridad"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
        />
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
          <NumberFormatController
            name="amount"
            label="Monto"
            description="Monto de ingreso mensual"
            placeholder="Ej: 500,00"
            classNameItem="flex-0"
          />
          <NumberFormatController
            name="amountExchange"
            label="Tasa de cambio"
            description="Monto de Tasa de cambio mensual"
            placeholder="Ej: 36,10"
            classNameItem="flex-0"
          />
          <Button type="button" onClick={handleAddAmount}>
            Agregar
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Ingreso</TableHead>
              <TableHead className="text-center">Tasa</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {amounts.map((amount) => (
              <TableRow key={`table_row_${amount.id}`}>
                <TableCell className="text-center">
                  {amount.amount + ' '}
                  {getValues('currency')}
                </TableCell>
                <TableCell className="text-center">
                  {amount.amountExchange + ' '}
                  {getValues('currency')}
                </TableCell>
                <TableCell className="w-[50px] text-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger
                        onClick={() => {
                          handleRemoveAmount(amount.id)
                        }}
                      >
                        <DeleteIcon />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Eliminar</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button type="submit">Generar certificación</Button>
      </FormProvider>
    </div>
  )
}

export { CertificateForm }
