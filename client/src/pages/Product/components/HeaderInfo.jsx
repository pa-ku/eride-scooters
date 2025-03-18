import { useEffect, useState } from 'react'

import { formatPrice } from '#utils/formatPrice.js'
import { calcDiscount } from '#utils/calcDiscount.js'
import { ShoppingCart } from 'lucide-react'

import FavButton from '#components/FavButton.jsx'
import ShippingModal from './ShippingModal'
export default function HeaderInfo ({
  title,
  price,
  discount,
  description,
  id
}) {
  const [shipping, setShipping] = useState(false)

  return (
    <>
      <div className='md:w-1/2'>
        <h1 className='mb-2 text-3xl font-bold text-gray-900'>{title}</h1>
        <div className='mb-4 flex items-center'>
          <div className='flex text-yellow-400'>
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star}>★</span>
            ))}
          </div>
          <span className='ml-2 text-gray-600'>{Math.floor(Math.random() *125)} reviews</span>
        </div>

        {!discount && (
          <p className='mb-4 text-2xl font-bold text-gray-900'>
            ${formatPrice(price)}
          </p>
        )}

        {discount && (
          <div>
            <span className='flex gap-3 text-2xl text-gray-900'>
              <p className='font-bold'>${calcDiscount(price, discount)}</p>
              <p className='text-primary-500'>{discount}% OFF</p>
            </span>
            <p className='text-gray-500 line-through'>${formatPrice(price)}</p>
          </div>
        )}

        <p className='mb-6 text-gray-600'>{description}</p>

        <div className='mb-6 flex space-x-4'>
          <button
            className='button justify-center-center flex items-center'
            onClick={() => setShipping(true)}
          >
            <ShoppingCart size={20} className='mr-2' />
            Comprar
          </button>
          {shipping && (
            <ShippingModal
              title={title}
              price={price}
              shipping={shipping}
              setShipping={setShipping}
            />
          )}
    {/*       <button title='Compartir' className='rounded-lg bg-gray-100 p-3'>
            <Share2 size={20} />
          </button> */}
          <label
            title='Agregar Favorito'
            className='group flex cursor-pointer items-center justify-center rounded-lg hover:bg-red-400 bg-red-500 p-1 duration-300'
          >
            <FavButton productId={id} />
          </label>
        </div>
        <ShippingInfo />
      </div>
    </>
  )
}

function ShippingInfo () {
  const [shippingDay, setShippingDay] = useState()

  useEffect(() => {
    const hoy = new Date()
    const seisDiasDespues = new Date()
    seisDiasDespues.setDate(hoy.getDate() + 6)
    const diaDeLaSemana =
      seisDiasDespues.toLocaleDateString('es-ES', {
        weekday: 'long'
      }) +
      ' ' +
      seisDiasDespues.toLocaleDateString()
    setShippingDay(diaDeLaSemana)
  }, [])
  return (
    <div className='border-t border-gray-200 pt-4'>
      <div className='flex flex-col text-sm'>
        <p className='text-green-600'>Llega gratis el {shippingDay}</p>
        <span className='flex gap-2'>
          <p className='text-[var(--main-color-450)]'>Devolución gratis</p>
          <p className='text-gray-500'>Tenés 30 días desde que lo recibís.</p>
        </span>
      </div>
    </div>
  )
}
