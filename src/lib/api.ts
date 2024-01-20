import axios, { AxiosInstance } from 'axios'
import { BASE_PATH } from '@/config'

const getToken = () => {
  return null
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_PATH,
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken()
    const auth = token ? `Bearer ${token}` : ''
    config.headers.Authorization = auth
    return config
  },
  (error) => Promise.reject(error),
)

export { axiosInstance }
