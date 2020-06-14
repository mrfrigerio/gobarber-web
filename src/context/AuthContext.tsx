import React, { createContext, useCallback, useState, useContext } from 'react'
import api from '../services/api'

interface AuthContextData extends AuthState {
  signIn: (credentials: SignInCredentials) => Promise<void>
  signOut: () => void
}

interface SignInCredentials {
  email: string
  password: string
}

interface AuthState {
  token: string
  user: any
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be called within an AuthProvider context!')
  }
  return context
}

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const storagedToken = localStorage.getItem('@Gobarber:token')
    const storagedUser = localStorage.getItem('@Gobarber:user')
    if (storagedToken && storagedUser) {
      return { token: storagedToken, user: JSON.parse(storagedUser) }
    }
    return {} as AuthState
  })

  const signIn = useCallback(
    async ({ email, password }: SignInCredentials): Promise<void> => {
      try {
        const response = await api.post('/sessions', {
          email,
          password
        })
        const { user, token } = response.data
        setData({ user, token })
        localStorage.setItem('@Gobarber:token', token)
        localStorage.setItem('@Gobarber:user', JSON.stringify(user))
      } catch (err) {
        throw new Error('Falha na autenticação')
      }
    },
    []
  )

  const signOut = useCallback(() => {
    localStorage.removeItem('@Gobarber:token')
    localStorage.removeItem('@Gobarber:user')
    setData({} as AuthState)
  }, [])

  return (
    <AuthContext.Provider value={{ ...data, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
