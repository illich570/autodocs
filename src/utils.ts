const generateUUID = (): string => {
  return '00' + crypto.randomUUID().slice(2)
}

export { generateUUID }
