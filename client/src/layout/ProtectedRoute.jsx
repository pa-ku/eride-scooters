import { useAuth } from '#context/AuthContext'

import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoutes () {
  const { loading, isAuth } = useAuth()

  if (loading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <h1>Cargando...</h1>
      </div>
    )
  }

  if (!isAuth) {
    return <Navigate to='/user/login' replace />
  }

  return <Outlet />
}
