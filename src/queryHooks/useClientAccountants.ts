import { CreateRelationClientAccountant } from '@/components/sections/schemas'
import { axiosInstance } from '@/lib/api'
import { APIClientAccountants } from '@/queryHooks/routes/ clientAccountants'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Input } from 'valibot'

type validationSchemaCreateRelationClientAccountant = Input<typeof CreateRelationClientAccountant>

export type validationsParamsGetRelationByClientId = {
  clientId: string
}

const createRelationClientAccountant = async (
  relation: validationSchemaCreateRelationClientAccountant,
) => {
  const data = await axiosInstance.post(
    APIClientAccountants.createRelationClientAccountant,
    relation,
  )
  return data
}

const useCreateRelationClientAccountant = () => {
  return useMutation({
    mutationFn: createRelationClientAccountant,
  })
}

const getRelationByClientId = async ({
  clientId,
}: validationsParamsGetRelationByClientId): Promise<{
  success: boolean
  data: {
    relationResult: {
      id: number
      accountantName: string
      accountantId: number
    }[]
  }
}> => {
  const { data } = await axiosInstance.get(
    APIClientAccountants.getRelationClientAccountant(clientId),
  )
  return data
}

const useGetRelationByClientId = ({ clientId }: validationsParamsGetRelationByClientId) => {
  return useQuery({
    queryKey: [APIClientAccountants.getRelationClientAccountant(clientId), clientId],
    queryFn: () => getRelationByClientId({ clientId }),
    enabled: !!clientId,
  })
}

export { useCreateRelationClientAccountant, useGetRelationByClientId }
