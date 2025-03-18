import { useState } from 'react'

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { formatPrice } from '#src/utils/formatPrice.js'
import { createMpPreference } from '../utils/createMpPreference'

export default function ShippingModal({ title, price, setShipping }) {
  const [preferenceId, setPreferenceId] = useState(null)
  const [Payment, setPayment] = useState(false)
  const [message, setMessage ] = useState('')
  const [shippingData, setShippingData] = useState({})
  
  initMercadoPago(import.meta.env.VITE_INIT_MP, {
    locale: 'es-AR',
  })
  
  const HandleInput = (event) => {
    const value = event.target.value
    setShippingData({ ...shippingData, [event.target.name]: value })
  }
  const errorList = [{ name: true }]
  
  const handleBuy = async (e) => {
    e.preventDefault()
    if (errorList.every((item) => item !== undefined && item !== '')) {
      
      setPayment(true)
      const mpId = await createMpPreference({ title, price })
      if (mpId) {
        setPreferenceId(mpId)
      }
    } else {
      setMessage('Rellena el formulario de envio')
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
    { label: 'Codigo Postal', name: 'postalCode', type: 'number' },
  ]

  return (
    <section className="absolute  z-50 m-auto w-[35em] -translate-x-1/2 -translate-y-1/2">
        {!Payment && (
      <div className="rounded-lg p-5 bg-white  shadow-xl">
          <>
            <div className="flex w-full justify-between">
              <h1 className="text-3xl">Datos de Envío</h1>
              <button
                className="text-primary-600 flex size-9 items-center justify-center rounded-full p-2 text-3xl hover:bg-gray-100"
                onClick={() => {
                  setShipping(false)
                  setShippingData({})
                }}
                title="Cerrar modal"
              >
                🞪
              </button>
            </div>
            <p className="text-primary-500 text-sm">
              Todos nuestros productos cuentan con <b>envio gratis</b>
            </p>
            <form>
              <div className="space-y-2 py-3">
                {formImputs.map(({ type, name, label, value }) => (
                  <input
                    key={name}
                    type={type}
                    className="input-form"
                    name={name}
                    placeholder={label}
                    onChange={HandleInput}
                    value={value}
                  />
                ))}
              </div>
              <p className="text-red-500">{message}</p>
              <button
                className="bg-primary-500 w-full rounded-lg py-3 text-xl text-white"
                onClick={(e) => handleBuy(e)}
              >
                Confirmar
              </button>
            </form>
          </>
      </div>
        )}
      {Payment && (
        <PaymentModal
          title={title}
          price={price}
          shippingData={shippingData}
          preferenceId={preferenceId}
          setPayment={setPayment}
        />
      )}
    </section>
  )
}

function PaymentModal({
  title,
  price,
  shippingData,
  preferenceId,
  setPayment,
}) {
  return (
    <>
      <div className="relative rounded-lg bg-white shadow-xl">
        <span className="bg-primary-500 flex w-full rounded-t-lg items-center justify-between  p-5">
          <h2 className="text-2xl font-bold text-white">Pago</h2>
          <button
            className="text-primary-600 flex items-center justify-center rounded-lg bg-white px-4 hover:bg-gray-100"
            onClick={() => {
              setPayment(false)
            }}
            title="Cerrar modal"
          >
            Volver
          </button>
        </span>
        <div className="p-5 space-y-1">
          <p>
            <b>Producto:</b> {title}
          </p>
          <p>
            <b>Direccion:</b> {shippingData.address}
            {shippingData.NCalle}, {shippingData.province},{shippingData.city}
          </p>
          <p>
            <b>Total:</b> ${formatPrice(price)}
          </p>
        </div>
        {preferenceId && <Wallet initialization={{ preferenceId }} />}
      </div>
    </>
  )
}
