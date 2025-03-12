import AboutUsBanner from './components/AboutUsBanner'
import BrandsCarousel from './components/BrandsCarousel'
import FeaturedProduct from './components/FeaturedProduct'
import FeaturedSkeleton from './components/FeaturedSkeleton'
import HomeBanner from './components/HomeBanner'
import { Link } from 'react-router-dom'
import ProductCard from '#components/ProductCard'
import ProductSkeleton from '#components/ProductSkeleton'

import homeBanner from './images/scotter-banner.webp'
import useGetProducts from '#src/services/api/useGetProducts.jsx'
import { Zap } from 'lucide-react'

export default function Home () {
  const { data: featuredData, isLoading: loadingFeatured } = useGetProducts(
    'scooters/filter/featured'
  )

  const { data: bestOffers, isLoading: loadingBestOffers } = useGetProducts(
    'scooters/filter/bestOffers'
  )

  const { data: bestSellers, isLoading: loadingBestSellers } = useGetProducts(
    'scooters/filter/bestSellers'
  )

  return (
    <>
      <HomeBanner
        title='SOLO LO MEJOR'
        subtitle='No te conformes con menos cuando se trata de tu pasión'
      />
      <BrandsCarousel />
      <main className='flex flex-col items-center justify-center gap-20 py-20'>
        <section className='flex flex-col items-center justify-start gap-10'>
          <h2 className='title flex items-center justify-center gap-2'>
            <Zap size={36} /> Destacado
          </h2>
          {loadingFeatured
            ? (
              <FeaturedSkeleton />
              )
            : (
              <FeaturedProduct data={featuredData} />
              )}
        </section>
        <ProductRow
          title='Las mejores ofertas'
          products={bestOffers}
          loading={loadingBestOffers}
        />
        <BannerDontStopTraveling />
        <ProductRow
          title='Más vendidos'
          products={bestSellers}
          loading={loadingBestSellers}
        />
      </main>
      <AboutUsBanner />
    </>
  )
}

function ProductRow ({ title, loading, products }) {
  return (
    <section className='flex min-h-96 flex-col justify-start gap-5'>
      <h2 className='subtitle text-center'>{title}</h2>
      <div className='flex flex-wrap items-center justify-center gap-4 pt-5'>
        {loading
          ? Array(5)
            .fill()
            .map((_, index) => <ProductSkeleton key={index} />)
          : Array.isArray(products) &&
            products.map((productData, index) => (
              <ProductCard key={index} productData={productData} />
            ))}
      </div>
    </section>
  )
}

function BannerDontStopTraveling () {
  return (
    <section className='relative flex h-[calc(100vh-10em)] w-full snap-mandatory flex-col items-center justify-center gap-5 text-white'>
      <div className='flex max-w-[45em] flex-col'>
        <h2 className='text-6xl font-bold'>Nunca pares de viajar</h2>
        <p className='text-2xl'>
          Hagas lo que hagas, vas a necesitar equipo resistente, cómodo y
          duradero.
        </p>
      </div>
      <Link to='/product/scooters' className='button'>
        Explorar la colección
      </Link>
      <img
        className='absolute -z-10 h-full w-full object-cover object-center blur-[1px] brightness-90'
        loading='lazy'
        src={homeBanner}
        alt='Imagen del banner'
      />
    </section>
  )
}
