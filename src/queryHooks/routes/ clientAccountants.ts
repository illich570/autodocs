const APIClientAccountants = {
  createRelationClientAccountant: 'clients_accountants/create',

  getRelationClientAccountant: (clientId: string) =>
    `clients_accountants/get_by_client_id?clientId=${clientId}`,
}

export { APIClientAccountants }
