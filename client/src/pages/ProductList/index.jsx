import ProductCard from '#components/ProductCard'
import { Suspense } from 'react'
import { useProductFilters } from '#src/hooks/useProductFilters.jsx'
import { useQuery } from 'react-query'
import axios from 'axios'
import { API_ROUTE } from '#services/api/API_ROUTE'

export default function AllProducts () {
  const { category, sortBy, setFilters } = useProductFilters()

  const fetchProducts = async (endpoint) => {
    try {
      const { data } = await axios.get(`${API_ROUTE}/scooters`)
      return data
    } catch (error) {
      console.log(error)
    }
  }
  const { data, loading, error } = useQuery({
    queryKey: ['products', category, sortBy],
    queryFn: fetchProducts,
    retry: 1
  })

  const brands = ['MaxYou', 'Segway', 'VSett', 'Zero', 'InMotion', 'Dualtron']
  const orderBy = ['Menor Precio', 'Mayor Precio', 'Ofertas']
  return (
    <>
      <div className='flex flex-col md:flex-row'>
        <aside className='sticky top-0 flex h-screen w-48 flex-col items-start gap-5 bg-gray-100 px-4 py-10'>
          <FilterColumn
            paramName='category'
            title='Marca'
            activeFilter={category}
            array={brands}
            setFilters={setFilters}
          />
          <FilterColumn
            activeFilter={sortBy}
            paramName='sortBy'
            title='Precio'
            array={orderBy}
            setFilters={setFilters}
          />
        </aside>
        <main className='w-full px-5 py-10 md:py-20'>
          <h1 className='pb-10 text-center text-4xl'>Monopatines</h1>
          <section className='flex w-full flex-wrap justify-center gap-5'>
            {loading && <p>Cargando...</p>}
            {error && <p>{error.message}</p>}
            {data &&
              data.map((productData, index) => (
                <ProductCard productData={productData} />
              ))}
          </section>
        </main>
      </div>
    </>
  )
}

function FilterColumn ({ array, title, setFilters, paramName, activeFilter }) {
  return (
    <div className='flex flex-wrap space-y-1 md:block'>
      <h3 className='text-xl font-bold'>{title}</h3>
      <span className='flex flex-col items-start gap-1 pl-1'>
        {array.map((filterItem) => (
          <button
            onClick={() => setFilters({ [paramName]: filterItem })}
            key={filterItem}
            className={`${filterItem === activeFilter && 'bg-primary-100 text-primary-700'} rounded-lg px-2`}
          >
            {filterItem}
          </button>
        ))}
      </span>
    </div>
  )
}
