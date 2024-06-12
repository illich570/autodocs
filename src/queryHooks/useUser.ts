import { CreateUserParams } from '@/components/sections/schemas'
import { axiosInstance } from '@/lib/api'
import APIUsers from '@/queryHooks/routes/users'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Input } from 'valibot'

type validationSchemaCreateUser = Input<typeof CreateUserParams>

export type validationsParamsGetUsers = {
  limit: number
  offset: number
  typeUser: number | null
  active: number | null
}

const createUser = async (user: validationSchemaCreateUser) => {
  const data = await axiosInstance.post(APIUsers.createUser, user)
  return data
}

const useCreateUser = () => {
  return useMutation({
    mutationFn: createUser,
  })
}

const getUsers = async ({
  limit,
  offset,
  typeUser,
  active,
}: validationsParamsGetUsers): Promise<{
  success: boolean
  data: {
    users: {
      id: number
      name: string
      createdAt: string
    }[]
    total: number
  }
}> => {
  const { data } = await axiosInstance.get(APIUsers.getUsers({ limit, offset, typeUser, active }))
  return data
}

const useGetUsers = ({ limit, offset, typeUser, active }: validationsParamsGetUsers) => {
  return useQuery({
    queryKey: [APIUsers.getUsers, limit, offset, typeUser, active],
    queryFn: () => getUsers({ limit, offset, typeUser, active }),
  })
}

export { useCreateUser, useGetUsers }
