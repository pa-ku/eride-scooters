import { Link } from 'react-router-dom'
import { useAuth } from '#context/AuthContext'
import { useState } from 'react'

export default function Register () {
  const { userRegister, message } = useAuth()
  const [regMessage, setRegMessage] = useState()

  console.log(regMessage)

  async function handleSubmit (e) {
    e.preventDefault()
    setRegMessage(message)
    const name = e.target.name.value
    const lastname = e.target.lastname.value
    const email = e.target.email.value
    const password = e.target.password.value
    if (name === '') return setRegMessage('Rellena el campo de Nombre')
    if (lastname === '') return setRegMessage('Rellena el campo de Apellido')
    if (email === '') return setRegMessage('Rellena el campo de Email')
    if (password === '') return setRegMessage('Rellena el campo de Contraseña')
    if (password.length < 6) { return setRegMessage('La contraseña debe tener al menos 6 caracteres') } else {
      userRegister({ lastname, name, password, email })
    }
  }

  return (
    <>
      <div className='flex h-[calc(100vh-3.5em)] w-full items-center justify-center'>
        <form
          name='register'
          onSubmit={handleSubmit}
          className='mb-20 flex w-96 flex-col gap-3'
        >
          <h1 className='text-3xl'>Registrarse</h1>
          <div className='grid grid-cols-2 gap-2'>
            <input
              name='name'
              type='text'
              autoComplete='name'
              className='input-form'
              placeholder='Nombre'
            />
            <input
              name='lastname'
              type='text'
              autoComplete='lastname'
              className='input-form'
              placeholder='Apellido'
            />
          </div>

          <input
            name='email'
            type='email'
            autoComplete='email'
            className='input-form'
            placeholder='email'
          />

          <label className='flex flex-col'>
            <div className='flex w-full flex-row'>
              <input
                name='password'
                type='password'
                autoComplete='current-password'
                className='input-form'
                placeholder='password'
              />
            </div>
          </label>

          <button
            type='submit'
            className='button w-full'
          >
            Enviar
          </button>
          <Link
            className='hyperlink'
            to='/user/login'
          >
            Ya tienes una cuenta? Ingresa aqui
          </Link>
          <div className='flex h-10 flex-col'>{regMessage}</div>
        </form>
      </div>
    </>
  )
}
