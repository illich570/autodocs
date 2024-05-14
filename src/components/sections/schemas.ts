import {
  object,
  string,
  minLength,
  date,
  minValue,
  array,
  number,
  merge,
  omit,
  email,
  forward,
  custom,
} from 'valibot'

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
    documentId: string(),
  }),
])

const LoginSchema = object({
  email: string([minLength(1, 'El correo es requerido'), email('Ingrese un correo válido')]),
  password: string([minLength(1, 'La contraseña es requerida')]),
})

const CreateUserSchema = object(
  {
    firstName: string([minLength(1, 'El nombre es requerido')]),
    lastName: string(),
    email: string([minLength(1, 'El correo es requerido'), email('Ingrese un correo válido')]),
    password: string([
      minLength(1, 'La contraseña es requerida'),
      minLength(8, 'La contraseña debe tener al menos 8 caracteres'),
    ]),
    confirmPassword: string([minLength(1, 'La confirmación de contraseña es requerida')]),
    typeUserId: string([minLength(1, 'El tipo de usuario es requerido')]),
  },
  [
    forward(
      custom((input) => input.password === input.confirmPassword, 'Las contraseñas no coinciden'),
      ['confirmPassword'],
    ),
  ],
)

const CreateUser = merge([CreateUserSchema, object({ typeUserId: number() })])

const CreateUserParams = omit(CreateUser, ['confirmPassword'])

export {
  CertificateSchemaForm,
  CertificateSchemaParams,
  LoginSchema,
  CreateUserSchema,
  CreateUserParams,
}
