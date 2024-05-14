import { createContext, ReactNode, useCallback, useContext, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

type authProviderProps = {
  children: ReactNode
}

type userToken = {
  id: number
  typeUserName: string
  firstName: string
  lastName: string
  email: string
  iat: number
}

export type authContextType = {
  user: userToken | null
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

const checkUser = () => {
  const user = localStorage.getItem('user')
  if (user) {
    return JSON.parse(user) as userToken
  }
  return null
}

const AuthProvider = ({ children }: authProviderProps) => {
  const [user, setUser] = useState<userToken | null>(checkUser())
  const isAuth = !!user

  const login = useCallback((token: string) => {
    const decodedToken = jwtDecode(token) as userToken
    setUser(decodedToken)
    localStorage.setItem('user', JSON.stringify(decodedToken))
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('user')
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
