import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Mock checking if user is already logged in (e.g. from SecureStore)
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [])

  const login = async (email, password) => {
    // Mock login logic
    setIsLoading(true)
    setTimeout(() => {
      setUser({ id: '1', email, name: 'John Doe' })
      setIsLoading(false)
    }, 800)
  }

  const signup = async (data) => {
    // Mock signup logic
    setIsLoading(true)
    setTimeout(() => {
      setUser({ id: '1', email: data.email, name: data.name })
      setIsLoading(false)
    }, 800)
  }

  const logout = async () => {
    setIsLoading(true)
    setTimeout(() => {
      setUser(null)
      setIsLoading(false)
    }, 500)
  }

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      signup,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
