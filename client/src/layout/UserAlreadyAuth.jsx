import { Navigate, Outlet } from 'react-router'
import { useAuth } from '#context/AuthContext'

export default function UserAlreadyAuth () {
  const { loading, isAuth } = useAuth()

  if (loading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <h1>Cargando...</h1>
      </div>
    )
  }

  if (isAuth) return <Navigate to='/' replace />

  return <Outlet />
}
