import { LoginSchema } from '@/components/sections/schemas'
import { axiosInstance } from '@/lib/api'
import { APIAuth } from '@/queryHooks/routes/auth'
import { useMutation } from '@tanstack/react-query'
import { Input } from 'valibot'

type validationLoginSchema = Input<typeof LoginSchema>

const login = async (loginData: validationLoginSchema) => {
  const data = await axiosInstance.post(APIAuth.login, loginData)
  return data
}

const useLogin = () => {
  return useMutation({
    mutationFn: login,
  })
}

export { useLogin }
