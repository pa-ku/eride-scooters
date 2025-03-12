import { Suspense, useEffect } from 'react'
import { useLocation } from 'react-router'

import useGetProductById from '#src/services/api/useGetProductById.jsx'

import Skeleton from '#components/Skeleton.jsx'
import ProductSpecs from './components/ProductSpecs.jsx'
import ProductHeader from './components/ProductHeader.jsx'

export default function ProductShowcase () {
  const location = useLocation()
  const productId = location.pathname.split('/')[3]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  return (
    <div className='min-h-screen'>
      <Suspense fallback={<Skeleton />}>
        <ProductContent productId={productId} />
      </Suspense>
    </div>
  )
}

function ProductContent ({ productId }) {
  const { data } = useGetProductById(productId)
  return (
    <>
      <ProductHeader data={data} />
      <ProductSpecs specs={data.specs} />
    </>
  )
}
