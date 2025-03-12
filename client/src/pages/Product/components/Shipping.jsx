import { useState } from 'react'

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'

export default function Shipping ({ title, price, setShipping }) {
  const [preferenceId, setPreferenceIdId] = useState(null)
  const [pay, setPay] = useState(false)
  initMercadoPago('APP_USR-400ac6bd-a71b-4e78-9dfe-7f390acd7f68', {
    locale: 'es-AR'
  })
  const [fillMsj, setFillMsj] = useState('')
  const [shippingData, setShippingData] = useState({})

  const HandleInput = (event) => {
    const value = event.target.value
    setShippingData({ ...shippingData, [event.target.name]: value })
  }

  const errorList = [{ name: true }]
  const createMpPreference = async () => {
    try {
      const res = await fetch(
        'https://eride-api.vercel.app/api/payment/create_preference',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            description: title,
            price,
            quantity: 1
          })
        }
      )
      const data = await res.json()
      return data.id
    } catch (err) {
      console.log(err)
    }
  }

  const handleBuy = async (e) => {
    e.preventDefault()
    if (errorList.every((item) => item !== undefined && item !== '')) {
      setPay(true)
      const id = await createMpPreference()
      if (id) {
        setPreferenceIdId(id)
      }
    } else {
      setFillMsj('Rellena el formulario de envio')
    }
  }

  const formImputs = [
    { label: 'Nombre', name: 'name', type: 'text' },
    { label: 'Apellido', name: 'lastName', type: 'text' },
    { label: 'Telefono', name: 'phone', type: 'number' },
    { label: 'Email', name: 'email', type: 'email' },
    { label: 'Provincia', name: 'province', type: 'text' },
    { label: 'Ciudad', name: 'city', type: 'text' },
    { label: 'Direccion', name: 'address', type: 'text' },
    { label: 'Codigo Postal', name: 'postalCode', type: 'number' }
  ]

  return (
    <section className='absolute left-1/2 top-1/2 z-50 m-auto w-[35em] -translate-x-1/2 -translate-y-1/2'>
      <div className='rounded-lg bg-white p-7 shadow-xl'>
        {pay === false && (
          <>
            <div className='flex w-full justify-between'>
              <h1 className='text-3xl'>Datos de Envío</h1>
              <button
                className='flex size-9 items-center justify-center rounded-full p-2 text-3xl text-primary-600 hover:bg-gray-100'
                onClick={() => {
                  setShipping(false)
                  setShippingData({})
                }}
                title='Cerrar modal'
              >
                🞪
              </button>
            </div>
            <p className='text-sm text-primary-500'>
              Todos nuestros productos cuentan con <b>envio gratis</b>
            </p>
            <form>
              <div>
                {formImputs.map(({ type, name, label, value }, index) => (
                  <input
                    key={index}
                    type={type}
                    className='input-form'
                    name={name}
                    placeholder={label}
                    onChange={HandleInput}
                    value={value}
                  />
                ))}
              </div>
              <p className='text-red-500'>{fillMsj}</p>
              <button
                className='w-full rounded-lg bg-primary-500 py-3 text-xl text-white'
                onClick={(e) => handleBuy(e)}
              >
                Confirmar
              </button>
            </form>
          </>
        )}
        {pay === true && (
          <>
            <div>
              <h2 className='subtitle'>Pago</h2>
              <div>
                <p>
                  <b>♦ Producto:</b> {title}
                </p>
                <p>
                  <b>♦ Direccion:</b> {shippingData.calle}{' '}
                  {shippingData.NCalle}, {shippingData.provincia},{' '}
                  {shippingData.localidad}
                </p>
                <p>
                  <b>♦ Total:</b> $
                  {price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')}
                </p>
              </div>
              {preferenceId && <Wallet initialization={{ preferenceId }} />}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
