import { useAuth } from '#context/AuthContext'
import ProductCard from '#components/ProductCard'
import useGetManyProductsById from '#services/api/useGetManyProductsById.jsx'

export default function Favorites () {
  const { user } = useAuth()
  const { data, loading } = useGetManyProductsById(user.favorites)

  return (
    <>
      <div className='flex min-h-[30em] flex-col items-center justify-center gap-10 py-20'>
        <h1 className='text-center text-4xl'>Favoritos</h1>
        <section className='flex flex-wrap items-center justify-center gap-10'>
          {!loading && data.length > 0
            ? (
                data.map((product) => (
                  <ProductCard key={product._id} productData={product} />
                ))
              )
            : (
              <p>Agrega tus productos favoritos y velos aqui!</p>
              )}
        </section>
      </div>
    </>
  )
}
