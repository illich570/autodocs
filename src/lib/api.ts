import axios, { AxiosInstance } from 'axios'
import { BASE_PATH } from '@/config'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_PATH,
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
})

export { axiosInstance }
