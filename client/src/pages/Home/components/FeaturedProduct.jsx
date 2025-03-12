import { calcDiscount } from '#utils/calcDiscount.js'
import { formatPrice } from '#utils/formatPrice.js'
import { Link } from 'react-router-dom'

export default function FeaturedProduct ({ data }) {
  return (
    <>
      <div className='flex flex-col-reverse px-4 md:flex-row'>
        <section className='flex flex-col md:w-96'>

          <h2 className='text-3xl'>{data.title}</h2>
          {data.discount && (
            <p className='text-gray-500 line-through'>
              $ {calcDiscount(data.price, data.discount)}
            </p>
          )}

          <div className=' flex gap-2 flex-col'>
            <p className='text-3xl text-primary-600'>
              {data.price && formatPrice(data.price)}
            </p>
            <p className=''>{data.description}</p>
            <Link
              className='button'
              to={'/product/id/' + data._id}
            >
              Saber Más
            </Link>
          </div>
        </section>
        <div className='px-2'>
          <p className='absolute text-2xl font-bold text-primary-400'>
            {data.discount}% OFF
          </p>
          <img
            className='m-auto size-80 object-contain md:size-96'
            src={data.coverImage}
            alt='imagen de producto destacado'
          />
        </div>
      </div>
    </>
  )
}
