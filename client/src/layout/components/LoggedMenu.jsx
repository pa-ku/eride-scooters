import { Link } from 'react-router-dom'
import { useAuth } from '#context/AuthContext'
import { LogOutIcon } from 'lucide-react'

export default function LoggedMenu ({ menuRef, setIsOpen }) {
  const { userLogout, user } = useAuth()

  return (
    <>
      <div
        ref={menuRef}
        className='absolute right-0 z-50 flex w-max flex-col gap-2 rounded-lg bg-white px-7 py-6 shadow-xl'
      >
        <div className='relative flex flex-col items-center gap-3'>
          <h2 className='text-xl font-bold'>¡Hola, {user.name}!</h2>
          <Link
            to='user/profile'
            onClick={() => setIsOpen(false)}
            className='w-full rounded-lg border border-primary-500 px-4 py-1 text-center text-primary-500 hover:bg-primary-500 hover:text-white'
          >
            Administrar mi cuenta
          </Link>

          <button
            onClick={userLogout}
            data-test-id='btn-logout'
            role='button logout'
            className='justy-center flex items-center gap-1 stroke-black hover:stroke-primary-500 hover:text-primary-500'
          >
            <LogOutIcon size={19} />
            Salir
          </button>
        </div>
      </div>
    </>
  )
}
