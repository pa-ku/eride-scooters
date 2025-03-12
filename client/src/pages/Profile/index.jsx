import { useState } from 'react'
import useProfile from '#hooks/useGetUserProfile'
import { API_ROUTE } from '#services/api/API_ROUTE'

export default function Profile () {
  const { userData, loading: loadingUser } = useProfile()
  const [isEditing, setIsEditing] = useState(false)

  const [userShippingData, setUserShippingData] = useState({})
  const [loading, setLoading] = useState(true)

  function handleInput (value) {
    setUserShippingData(value)
  }

  async function saveEditedProfile () {
    try {
      setLoading(true)
      const res = await fetch(`${API_ROUTE}/user/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userShippingData })
      })
      const data = await res.json()
      console.log(data)
    } catch (err) {
      console.error('¡Hubo un problema con la solicitud!', err)
    } finally {
      setLoading(false)
    }
  }

  function cancelEdit () {
    setIsEditing(false)
  }

  function handleEdit () {
    if (isEditing) {
      saveEditedProfile()
      setIsEditing(false)
    } else {
      setIsEditing(true)
    }
  }

  const formInputs = [
    { name: 'nombre', label: 'Nombre', value: userData.name },
    { name: 'appelido', label: 'Apellido', value: userData.lastname },
    { name: 'direccion', label: 'Direccion', value: userData.address },
    { name: 'provincia', label: 'Provincia', value: userData.province },
    { name: 'cp', label: 'Codigo postal', value: userData.cp },
    { name: 'email', label: 'Email', value: userData.email },
    { name: 'calle', label: 'Calle' },
    { name: 'localidad', label: 'Localidad', value: userData.localidad },
    { name: 'telefono', label: 'Telefono', value: userData.phone },
    { name: 'dni', label: 'DNI', value: userData.dni },
    { name: 'NCalle', label: 'Numero de calle', value: userData.cp }
  ]

  return (
    <>
      <section className='just-center flex flex-col items-center gap-10 py-20'>
        <h1 className='py10 text-center text-4xl'>Mi Perfil</h1>
        <div>
          <div
            className={`${isEditing ? 'pointer-events-auto' : 'pointer-events-none'} grid grid-cols-2 items-center justify-center gap-4 px-10 text-primary-700`}
          >
            {!loadingUser &&
              formInputs.map(({ name, label, value }) => (
                <input
                  key={label}
                  className='input-form'
                  type='text'
                  name={name}
                  placeholder={label}
                  value={value && value}
                  onChange={(e) => handleInput(e.target.value)}
                />
              ))}
            {loading && <p>Cargando...</p>}
          </div>
        </div>
        <div className='just-center flex items-center gap-5'>
          <button
            className='w-max rounded-lg bg-primary-500 px-4 py-3 text-lg text-white hover:bg-primary-400'
            onClick={handleEdit}
          >
            {isEditing ? 'Guardar cambios' : 'Editar mis datos'}
          </button>
          {isEditing && (
            <>
              <button
                onClick={cancelEdit}
                className='w-max rounded-lg bg-red-500 px-4 py-3 text-lg text-white hover:bg-red-400'
              >
                Cancelar cambios
              </button>
            </>
          )}
        </div>
      </section>
    </>
  )
}
