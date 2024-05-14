const generateUUID = (): string => {
  return '00' + crypto.randomUUID().slice(2)
}

const formatAmount = (holderId: string): string => {
  return Number(holderId).toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 3,
  })
}

const currencies: { [key: string]: string } = {
  BS: 'Bs.',
  USD: '$',
}
const getFormatCurrency = (currency: string): string => {
  return currencies[currency] || 'N/A'
}

const TYPE_USERS = {
  Administrador: {
    name: 'Administrador',
  },
  Contador: {
    name: 'Contador',
  },
  Cliente: {
    name: 'Cliente',
  },
}

export { generateUUID, formatAmount, getFormatCurrency, TYPE_USERS }
