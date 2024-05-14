import { axiosInstance } from '@/lib/api'
import { APITypeUsers } from '@/queryHooks/routes/typeUsers'
import { useQuery } from '@tanstack/react-query'

type typeUsers = {
  id: number
  name: string
}
const getTypeUsers = async (): Promise<{
  success: boolean
  data: {
    typeUsers: typeUsers[]
  }
}> => {
  const { data } = await axiosInstance.get(APITypeUsers.getAllTypeUsers)
  return data
}

const useGetTypeUsers = () => {
  return useQuery({
    queryKey: [APITypeUsers.getAllTypeUsers],
    queryFn: getTypeUsers,
  })
}

export { useGetTypeUsers }
