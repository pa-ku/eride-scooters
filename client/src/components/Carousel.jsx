import { useState } from 'react'
export default function Carousel ({ images }) {
  const [actualImg, setActualImg] = useState(0)

  return (
    <>
      <section className='pb- flex flex-col-reverse md:flex-row'>
        <div className='flex max-h-96 flex-wrap items-center justify-center gap-2 md:flex-col'>
          {images.map((image, index) => (
            <button
              className='rounded-xl shadow-md duration-300 hover:shadow-xl'
              key={index}
              onMouseEnter={() => setActualImg(index)}
            >
              <img
                className='size-16 rounded-xl bg-white object-contain'
                src={image}
                alt='Imagen pequeña del producto'
              />
            </button>
          ))}
        </div>

        <div className='flex items-center justify-center'>
          <img
            className='size-80 object-contain md:size-96'
            src={images[actualImg]}
            alt='Imagen de carousel de productos'
          />
        </div>
      </section>
    </>
  )
}
