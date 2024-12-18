import { valibotResolver } from '@hookform/resolvers/valibot'
import { useForm } from 'react-hook-form'
import { Input } from 'valibot'
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
import { Dispatch, useState, useEffect } from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/Tooltip'
import { DeleteIcon, PlusCircleIcon } from 'lucide-react'
import { DatePickerController } from '@/components/form/DatePickerController'
import { useGenerateDocument } from '@/queryHooks/useDocuments'
import { toast } from 'sonner'
import { isAxiosError } from 'axios'
import { CertificateSchemaForm, CertificateSchemaParams } from '@/components/sections/schemas'
import { format } from 'date-fns'
import { generateUUID, formatAmount, getFormatCurrency } from '@/utils'
import { es } from 'date-fns/locale'

export type Iamounts = {
  amount: string
  amountExchange: string
  id: number
}

type FormProps = {
  handleResultPdf: Dispatch<React.SetStateAction<string | null>>
}

type validationSchema = Input<typeof CertificateSchemaForm>
type validationParamsSchema = Input<typeof CertificateSchemaParams>

const CertificateForm = ({ handleResultPdf }: FormProps) => {
  const [amounts, setAmounts] = useState<Iamounts[]>([])
  const [documentId, setDocumentId] = useState<string>('')

  const { mutate } = useGenerateDocument()

  const methods = useForm<validationSchema>({
    resolver: valibotResolver(CertificateSchemaForm),
    defaultValues: {
      workActivity: '',
      reasonDocument: '',
      addressedName: '',
      holderId: '',
      typeId: '',
      holderName: '',
      revisionReasons: '',
      sex: '',
      currency: '',
      securityNumber: '',
      amount: '',
      amountExchange: '',
      quantityMonths: '',
      dateGenerate: new Date(),
      dateEmit: new Date(),
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
    if (amounts.length !== parseInt(data.quantityMonths)) {
      return toast.error(
        'La cantidad de meses no coincide con la cantidad de ingresos mensuales, por favor verifique.',
      )
    }
    const listAmounts = []
    const listExchangeRates = []
    for (const amount of amounts) {
      const parseredAmount = parseFloat(amount.amount)
      const parseredAmountExchange = parseFloat(amount.amountExchange)
      listAmounts.push(parseredAmount)
      listExchangeRates.push(parseredAmountExchange)
    }
    const dataParameters: validationParamsSchema = {
      ...data,
      dateGenerate: format(data.dateGenerate, 'dd/MM/yyyy'),
      listAmounts,
      listExchangeRates,
      securityNumber: parseInt(data.securityNumber),
      quantityMonths: parseInt(data.quantityMonths),
      dateEmit: format(data.dateEmit, 'dd/MM/yyyy'),
      documentId,
    }
    mutate(dataParameters, {
      onSuccess: (data) => {
        const urlCreated = URL.createObjectURL(data.data)
        handleResultPdf(urlCreated)
        toast.success('Documento generado correctamente!')
      },
      onError: (error) => {
        if (isAxiosError(error)) {
          toast.error(error.response?.data?.message || 'Error al generar el documento')
        }
      },
    })
  }

  useEffect(() => {
    setDocumentId(generateUUID())
  }, [])

  return (
    <div className="w-full max-w-lg rounded-xl border bg-card p-6 text-card-foreground shadow md:max-w-md lg:max-w-xl">
      <h3 className="pb-2 text-2xl font-semibold tracking-tight first:mt-0">
        Certificación de ingresos
      </h3>
      <FormProvider methods={methods} onSubmit={submit} className="flex w-full flex-col space-y-4">
        <InputController name="holderName" label="Nombre del titular" type="text" />
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
          <SelectController
            name="typeId"
            label="Tipo de identificación"
            placeholder="Seleccione una opción"
            values={[
              { value: 'V', label: '(V) - Venezolano' },
              { value: 'J', label: '(J) - Júridico' },
              { value: 'E', label: '(E) - Extranjero' },
            ]}
            classNameItem="flex-0"
          />
          <NumberFormatController
            name="holderId"
            label="Núm. de identificación"
            placeholder="Ej: 27.811.211"
            classNameItem="flex-1"
            decimalScale={0}
          />
        </div>

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

        <NumberFormatController
          name="securityNumber"
          label="Núm. de hoja de Seguridad"
          decimalScale={0}
        />
        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:space-x-4 lg:space-y-0">
          <DatePickerController
            name="dateGenerate"
            label="Fecha de calculos"
            description="Fecha de calculos de la certificación"
            classNameItem="flex-1"
          />
          <DatePickerController
            name="dateEmit"
            label="Fecha de emisión"
            description="Fecha de emisión del documento"
            classNameItem="flex-1"
          />
        </div>
        <InputController
          name="quantityMonths"
          label="Cantidad de meses"
          type="number"
          // inputMode="numeric"
          // pattern="[0-9]*"
          description="Cantidad de meses a calcular"
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
            description="Tasa de cambio mensual"
            placeholder="Ej: 36,10"
            classNameItem="flex-0"
          />
          <div className="hidden flex-1 items-center justify-center pt-2 md:flex">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger onClick={handleAddAmount} type="button" title="Agregar valores">
                  <PlusCircleIcon size={32} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Agregar valores</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <Button type="button" onClick={handleAddAmount} className="md:hidden" variant="informative">
          Agregar valores
        </Button>
        <Table className="my-2">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Mes</TableHead>
              <TableHead className="text-center">Ingreso</TableHead>
              <TableHead className="text-center">Tasa</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {amounts.map((amount, index) => (
              <TableRow key={`table_row_${amount.id}`}>
                <TableCell className="text-center">
                  {format(
                    new Date(getValues('dateGenerate')).setMonth(
                      new Date(getValues('dateGenerate')).getMonth() -
                        (parseInt(getValues('quantityMonths')) - index - 1),
                    ),
                    'MMMM',
                    { locale: es },
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {formatAmount(amount.amount) + ' '}
                  {/* {if the case is in bs, we need to express this amount in dollars} */}
                  {getValues('currency') === 'BS' && getFormatCurrency('USD')}
                </TableCell>
                <TableCell className="text-center">
                  {formatAmount(amount.amountExchange) + ' '}
                  {getFormatCurrency(getValues('currency'))}
                </TableCell>
                <TableCell className="w-[50px] text-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger
                        type="button"
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
