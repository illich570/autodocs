import { object, string, minLength, date, minValue, array, number, merge, omit } from 'valibot'

const BaseCertificateForm = object({
  workActivity: string([minLength(1, 'La actividad laboral es requerida')]),
  reasonDocument: string([minLength(1, 'La razón del documento es requerida')]),
  addressedName: string([minLength(1, 'El nombre del receptor es requerido')]),
  typeId: string([minLength(1, 'El tipo de identificación es requerido')]),
  holderId: string([minLength(1, 'El numero de identificación es requerido')]),
  holderName: string([minLength(1, 'El nombre del titular es requerido')]),
  revisionReasons: string([minLength(1, 'La razón de revisión es requerida')]),
  sex: string([minLength(1, 'El sexo es requerido')]),
  currency: string([minLength(1, 'La moneda es requerida')]),
  securityNumber: string([minLength(1, 'El numero de hoja de seguridad es requerido')]),
  amount: string(),
  amountExchange: string(),
  quantityMonths: string([minValue('1', 'La cantidad de meses debe ser mayor a 0')]),
  dateGenerate: date(),
  dateEmit: date(),
  listAmounts: array(number()),
  listExchangeRates: array(number()),
})

const CertificateSchemaForm = omit(BaseCertificateForm, ['listAmounts', 'listExchangeRates'])

const CertificateSchemaParams = merge([
  BaseCertificateForm,
  object({
    dateGenerate: string(),
    dateEmit: string(),
    quantityMonths: number(),
    securityNumber: number(),
  }),
])

export { CertificateSchemaForm, CertificateSchemaParams }

// const CertificateSchemaForm = object({
//   workActivity: string([minLength(1, 'La actividad laboral es requerida')]),
//   reasonDocument: string([minLength(1, 'La razón del documento es requerida')]),
//   addressedName: string([minLength(1, 'El nombre del receptor es requerido')]),
//   typeId: string([minLength(1, 'El tipo de identificación es requerido')]),
//   holderId: string([minLength(1, 'El numero de identificación es requerido')]),
//   holderName: string([minLength(1, 'El nombre del titular es requerido')]),
//   revisionReasons: string([minLength(1, 'La razón de revisión es requerida')]),
//   sex: string([minLength(1, 'El sexo es requerido')]),
//   currency: string([minLength(1, 'La moneda es requerida')]),
//   securityNumber: transform(
//     string([minLength(1, 'El numero de hoja de seguridad es requerido')]),
//     (value: string): number => parseInt(value),
//   ),
//   amount: string(),
//   amountExchange: string(),
//   quantityMonths: transform(
//     string([minValue('1', 'La cantidad de meses debe ser mayor a 0')]),
//     (value) => parseInt(value),
//   ),
//   dateGenerate: transform(date(), (value: Date) => format(value, 'dd/MM/yyyy')),
// })
