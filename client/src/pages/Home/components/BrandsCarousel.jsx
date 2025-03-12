import dualtron from '../images/brands/brand_dualtron.webp'
import inmotion from '../images/brands/brand_inmotion.webp'
import maxyou from '../images/brands/brand_maxyou.webp'
import segway from '../images/brands/brand_segway.webp'
import vsett from '../images/brands/brand_vsett.webp'
import zero from '../images/brands/brand_zero.webp'

export default function BrandsCarousel () {
  const brads = [dualtron, inmotion, maxyou, segway, vsett, zero]
  return (
    <div className='objec-fit flex flex-col items-center justify-center gap-1 bg-[#f5f5f5] text-center'>
      <div className='scroll-snap-x scroll flex flex-wrap items-center justify-center gap-x-10 grayscale'>
        {brads.map((image, index) => (
          <img
            className='w-32 object-contain duration-300'
            height={55}
            width={150}
            key={index}
            src={image}
            loading='lazy'
            alt='Imagen Marca'
          />
        ))}
      </div>
    </div>
  )
}
