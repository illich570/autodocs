const APIDocuments = {
  generateDocument: 'documents/generate',
  getAllDocuments: <TPagination>(limit: TPagination, offset: TPagination) =>
    `documents?limit=${limit}&offset=${offset}`,
  getDocumentFile: (documentId: number | null) => `documents/${documentId}/file`,
}

export { APIDocuments }
