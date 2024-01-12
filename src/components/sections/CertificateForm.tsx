import { valibotResolver } from '@hookform/resolvers/valibot'
import { useForm } from 'react-hook-form'
import { object, string, Output, minLength } from 'valibot'
import { FormProvider } from '../FormProvider'
import { InputController } from '../form/InputController'
import { Button } from '../ui/Button'

const CertificateForm = () => {
  const schema = object({
    username: string([minLength(1, 'El nombre de usuario es requerido')]),
    workActivity: string([minLength(1, 'La actividad laboral es requerida')]),
    reasonDocument: string([minLength(1, 'La razón del documento es requerida')]),
    addressedName: string([minLength(1, 'El nombre del receptor es requerido')]),
    holderId: string([minLength(1, 'El numero de identificación es requerido')]),
    holderName: string([minLength(1, 'El nombre del titular es requerido')]),
    revisionReasons: string([minLength(1, 'La razón de revisión es requerida')]),
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
    },
  })

  const submit = (data: validationSchema) => {
    console.log(data)
  }
  return (
    <div className="max-w-xl rounded-xl border bg-card p-6 text-card-foreground shadow">
      <h3 className="pb-2 text-2xl font-semibold tracking-tight first:mt-0">
        Generar certificación de ingresos
      </h3>
      <FormProvider methods={methods} onSubmit={submit} className="flex flex-col space-y-4">
        <InputController name="holderName" label="Nombre del titular" />
        <InputController name="holderId" label="Numero de Identificacion" />
        <InputController
          name="addressedName"
          label="Nombre del receptor"
          description="A quien va dirigido el documento"
        />
        <InputController
          name="workActivity"
          label="Actividad laboral"
          description="Actividad que realiza el titular"
        />
        <InputController
          name="reasonDocument"
          label="Razón de certificación"
          description="Finalidad del documento"
        />
        <InputController
          name="revisionReasons"
          label="Elementos revisados"
          description="Razones o elementos revisados"
        />
        <Button type="submit">Generar certificación</Button>
      </FormProvider>
    </div>
  )
}

export { CertificateForm }
