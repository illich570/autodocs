import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react'
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

const AuthProvider = ({ children }: authProviderProps) => {
  const [user, setUser] = useState<object | null>(null)
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const login = useCallback((token: string) => {
    const decodedToken = jwtDecode(token)
    setUser(decodedToken)
    cookies.set('access_token', token)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    cookies.remove('access_token')
  }, [])

  useEffect(() => {
    const token = cookies.get('access_token')
    if (token) {
      const decodedToken = jwtDecode(token)
      setUser(decodedToken)
      setIsAuth(true)
    }
  }, [])

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
