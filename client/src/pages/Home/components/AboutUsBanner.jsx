import lockIcon from '#assets/icons/lock.webp'
import shippingIcon from '#assets/icons/shipping.webp'
import premiumIcon from '#assets/icons/premium.webp'
import { Link } from 'react-router-dom'

export default function AboutUsBanner () {
  return (
    <div className='flex items-center justify-center bg-[#f5f5f5] p-3 md:h-96'>
      <div className='flex flex-col items-center justify-center gap-10'>
        <h2 className='subtitle'>Sobre Eride</h2>

        <div className='flex w-full flex-row flex-wrap justify-center gap-2'>
          <Section
            src={premiumIcon}
            alt='imagen de una estrella '
            text='Garantizamos el máximo valor por tu inversión'
          />
          <Section
            src={shippingIcon}
            alt='icono de envio'
            text='Tus compras cuentan con envío gratuito a todo el país'
          />
          <Section
            text='Tu privacidad es nuestra principal preocupación.'
            src={lockIcon}
            alt='imagen de un candado'
          />
        </div>

        <Link className='button' to='/about'>
          Conocer más...
        </Link>
      </div>
    </div>
  )
}

export function Section ({ src, alt, text }) {
  return (
    <>
      <div className='flex w-80 flex-col items-center justify-center'>
        <img
          width={120}
          height={100}
          className='pointer-events-none object-contain'
          src={src}
          alt={alt}
        />
        <p className='text-center'>{text}</p>
      </div>
    </>
  )
}
