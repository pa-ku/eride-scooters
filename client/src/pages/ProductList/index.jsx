import { useProductFilters } from '#src/hooks/useProductFilters.jsx'
import { useQuery } from '@tanstack/react-query'
import ProductCard from '#components/ProductCard'
import ProductListFilters from './components/ProductListFilters'
import { fetchProducts } from './fetchProducts'


export default function ProductList() {
  const { brand, sortBy, searchParams } = useProductFilters()

  const { data, loading, error } = useQuery({
    queryKey: ['products', brand, sortBy],
    queryFn: () => fetchProducts(searchParams.toString()),
    retry: 1,
  })

  return (
    <div className="flex flex-col md:flex-row">
      <aside className="sticky top-0 flex h-screen w-48 flex-col items-start gap-5 bg-gray-100 px-4 py-10">
        <ProductListFilters />
      </aside>
      <main className="w-full px-5 py-10 md:py-20">
        <h1 className="pb-10 text-center text-4xl">Monopatines</h1>
        <div className="flex w-full flex-wrap justify-center gap-5">
          {loading && <p>Cargando...</p>}
          {error && <p>{error.message}</p>}
          {data &&
            data.map((productData, index) => (
              <ProductCard key={index} productData={productData} />
            ))}
        </div>
      </main>
    </div>
  )
}
