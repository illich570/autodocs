import { CertificateSchemaParams } from '@/components/sections/schemas'
import { axiosInstance } from '@/lib/api'
import { APIDocuments } from '@/queryHooks/routes/documents'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Input } from 'valibot'

type validationParamsSchema = Input<typeof CertificateSchemaParams>

const generateDocument = async (document: validationParamsSchema) => {
  const data = await axiosInstance.post<Blob>(APIDocuments.generateDocument, document, {
    responseType: 'blob',
  })
  return data
}

const getDocuments = async () => {
  const { data } = await axiosInstance.get(APIDocuments.getAllDocuments)
  return data
}

const useGenerateDocument = () => {
  return useMutation({
    mutationFn: generateDocument,
  })
}

const useGetDocuments = () => {
  return useQuery({
    queryKey: [APIDocuments.getAllDocuments],
    queryFn: getDocuments,
  })
}

export { useGenerateDocument, useGetDocuments }
