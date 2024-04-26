import { createContext, ReactNode, useCallback, useContext, useState } from 'react'
import Cookies from 'universal-cookie'
import { jwtDecode } from 'jwt-decode'

type authProviderProps = {
  children: ReactNode
}

export type authContextType = {
  user: object | null
  login: (token: string) => void
  logout: () => void
  isAuth: boolean
}

const initialValue = {
  user: null,
  login: () => {},
  logout: () => {},
  isAuth: false,
}

const AuthContext = createContext<authContextType>(initialValue)
const cookies = new Cookies()

const getAuthUser = () => {
  const token = cookies.get('access_token')
  if (token) {
    const decodedToken = jwtDecode(token)
    return decodedToken
  }
  return null
}

const AuthProvider = ({ children }: authProviderProps) => {
  const [user, setUser] = useState<object | null>(getAuthUser())
  const isAuth = !!user
  const login = useCallback((token: string) => {
    const decodedToken = jwtDecode(token)
    setUser(decodedToken)
    cookies.set('access_token', token)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    cookies.remove('access_token')
  }, [])

  console.log(isAuth)
  console.log('Desde el context')

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuth }}>{children}</AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export { AuthProvider, useAuth }
