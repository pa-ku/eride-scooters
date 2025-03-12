import { createContext, useContext, useEffect, useState } from 'react'
import { tokenRequest } from '../services/api/auth'
import { useNavigate } from 'react-router-dom'
import cookies from 'js-cookie'
import { API_ROUTE } from '../services/api/API_ROUTE'
export const AuthContext = createContext()

export function useAuth () {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useContext debe estar dentro de un provider')
  }
  return context
}

export function AuthContextProvider ({ children }) {
  const [user, setUser] = useState(null)
  const [isAuth, setIsAuth] = useState(false)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    handleTokenValidation()
  }, [])

  useEffect(() => {
    setMessage('')
  }, [navigate])

  async function userLogin (user) {
    try {
      const res = await fetch(`${API_ROUTE}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
        credentials: 'include'
      })
      const data = await res.json()
      if (data.error) {
        console.log(res)
        setUser(null)
        return setMessage(data.error)
      } else {
        setUser(data)
        console.log(data)
        setIsAuth(true)
        navigate('/')
        console.log('login successful')
      }
    } catch (error) {
      console.log('login error', error)
    }
  }

  async function userRegister (user) {
    try {
      const res = await fetch(`${API_ROUTE}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
        credentials: 'include'
      })
      const data = await res.json()
      console.log(data)
      if (data.error) {
        setUser(null)
        setMessage(data.error)
      } else {
        setUser(data)
        setIsAuth(true)
        navigate('/')
      }
    } catch (error) {
      console.log('Login error', error)
    }
  }

  const handleTokenValidation = async () => {
    setLoading(true)

    try {
      const token = cookies.get().token
      if (!token) throw new Error('MISSING_TOKEN')

      const response = await tokenRequest(token)

      if (!response?.success) {
        throw new Error('INVALID_TOKEN', response?.error)
      }

      setIsAuth(true)
      setUser(response.data)
    } catch (error) {

    } finally {
      setLoading(false)
    }
  }

  function userLogout () {
    try {
      cookies.remove('token')
      setIsAuth(false)
      setUser(null)
      navigate('/')
    } catch (error) {
      console.log('error al salir', error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        userLogin,
        userRegister,
        userLogout,
        setUser,
        user,
        isAuth,
        message,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
