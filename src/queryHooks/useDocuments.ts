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

const useGenerateDocument = () => {
  return useMutation({
    mutationFn: generateDocument,
  })
}

const getDocuments = async <TPagination>(
  limit: TPagination,
  offset: TPagination,
): Promise<{
  success: boolean
  data: {
    documents: {
      id: number
      documentType: string
      holderId: number
      createdAt: string
    }[]
    total: number
  }
}> => {
  const { data } = await axiosInstance.get(APIDocuments.getAllDocuments(limit, offset))
  return data
}

const useGetDocuments = ({ limit, offset }: { limit: number; offset: number }) => {
  return useQuery({
    queryKey: [APIDocuments.getAllDocuments, limit, offset],
    queryFn: () => getDocuments<number>(limit, offset),
  })
}

export { useGenerateDocument, useGetDocuments }
