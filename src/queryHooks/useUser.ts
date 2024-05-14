import { CreateUserParams } from '@/components/sections/schemas'
import { axiosInstance } from '@/lib/api'
import APIUsers from '@/queryHooks/routes/users'
import { useMutation } from '@tanstack/react-query'
import { Input } from 'valibot'

type validationSchemaCreateUser = Input<typeof CreateUserParams>
const createUser = async (user: validationSchemaCreateUser) => {
  const data = await axiosInstance.post(APIUsers.createUser, user)
  return data
}

const useCreateUser = () => {
  return useMutation({
    mutationFn: createUser,
  })
}

export { useCreateUser }
