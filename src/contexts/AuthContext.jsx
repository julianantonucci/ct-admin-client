import React from 'react'
import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import useLocalStorageState from '../hooks/useLocalStorageState'

// Everything you need for authentication.
//
// AuthProvider - wrap something that needs auth info
//
// useAuth - hook, import and call {...} = useAuth() to get values object
//
// ProtectedRoute - Wrap an element and non-authed users will be redirected
//              to login page. After login they will be sent to requested page.

const AuthContext = React.createContext(null)

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const [token, setToken] = useLocalStorageState('camptree-admin-token', '')
  const [user, setUser] = React.useState({})

  const handleLogin = async (token) => {
    setToken(token)
    const origin = location.state?.from?.pathname || '/'
    navigate(origin)
  }

  const handleLogout = () => {
    setToken('')
  }

  const value = {
    token,
    user,
    setUser,
    onLogin: handleLogin,
    onLogout: handleLogout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return React.useContext(AuthContext)
}

export const ProtectedRoute = ({ children }) => {
  const { token } = useAuth()
  const location = useLocation()
  if (!token || token === '') {
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  return children
}
