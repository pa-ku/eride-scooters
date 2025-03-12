import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function HeaderImages ({ images, coverImage }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <div className='relative md:w-1/2'>
      <div className='relative h-[400px] overflow-hidden rounded-lg bg-white shadow-md'>
        <img
          src={images[currentIndex]}
          alt='Premium Headphones'
          className='h-full w-full object-contain'
        />

        <CarouselArrows
          imagesLength={images.length}
          setCurrentIndex={setCurrentIndex}
        />
      </div>
      <NavigationDots
        images={images}
        setCurrentIndex={setCurrentIndex}
        currentIndex={currentIndex}
      />
    </div>
  )
}

function CarouselArrows ({ setCurrentIndex, imagesLength }) {
  const nextIndex = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imagesLength)
  }

  const prevIndex = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + imagesLength) % imagesLength
    )
  }
  return (
    <>
      <button
        title='Previous Slide'
        onClick={prevIndex}
        className='absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md hover:bg-primary-400 hover:text-white'
      >
        <ChevronLeft size={20} />
      </button>
      <button
        title='Next Slide'
        onClick={nextIndex}
        className='absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md hover:bg-primary-400 hover:text-white'
      >
        <ChevronRight size={20} />
      </button>
    </>
  )
}

function NavigationDots ({ images, currentIndex, setCurrentIndex }) {
  return (
    <div className='mt-4 flex justify-center space-x-2'>
      {images.map((_, index) => (
        <button
          title='Change image slide'
          key={index}
          onClick={() => setCurrentIndex(index)}
          className={`h-3 w-3 rounded-full ${index === currentIndex ? '-translate-y-0.5 bg-primary-500 duration-300' : 'bg-gray-300'} px-2`}
        />
      ))}
    </div>
  )
}
