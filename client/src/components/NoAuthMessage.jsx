import { Link } from 'react-router-dom'

export default function Account () {
  return (
    <>
      <div className='flex h-[calc(100vh-3.5em)] items-center justify-center'>
        <section className='flex w-96 flex-col items-center justify-center gap-5 rounded-lg p-10 text-center shadow-xl'>
          <h1 className='text-2xl'>
            ¡Hola! Para agregar favoritos, ingresá a tu cuenta
          </h1>
          <Link className='button-main text-center' to='/user/register'>
            Crear cuenta
          </Link>
          <Link className='button-alt' to='/user/login'>
            Ingresar
          </Link>
        </section>
      </div>
    </>
  )
}
