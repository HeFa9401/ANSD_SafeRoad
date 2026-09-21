import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { decodeJwt, isJwtExpired } from '@/lib/jwt'
import type { AuthUser, UserRole } from '@/types/auth'

const TOKEN_KEY = 'saferoad_token'

interface AuthContextValue {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

function userFromToken(token: string): AuthUser | null {
  const payload = decodeJwt(token)
  if (!payload || isJwtExpired(payload)) return null
  return {
    id: payload.sub,
    email: payload.email,
    firstName: payload.first_name ?? '',
    lastName: payload.last_name ?? '',
    role: payload.role as UserRole,
    region: payload.region,
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem(TOKEN_KEY)
    if (stored) {
      const nextUser = userFromToken(stored)
      if (nextUser) {
        setToken(stored)
        setUser(nextUser)
      } else {
        localStorage.removeItem(TOKEN_KEY)
      }
    }
    setIsLoading(false)
  }, [])

  const login = useCallback((newToken: string) => {
    const nextUser = userFromToken(newToken)
    if (!nextUser) return
    localStorage.setItem(TOKEN_KEY, newToken)
    setToken(newToken)
    setUser(nextUser)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    setToken(null)
    setUser(null)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({ user, token, isAuthenticated: !!user, isLoading, login, logout }),
    [user, token, isLoading, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth doit être utilisé dans un <AuthProvider>')
  return ctx
}
