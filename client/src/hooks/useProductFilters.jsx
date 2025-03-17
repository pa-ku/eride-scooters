import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

export function useProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const brand = searchParams.get('brand')
  const sortBy = searchParams.get('sortBy')

  /* 
  @params Add filters to the URL
  @returns void
  @param filters {Object} - The filters to add to the URL
   */

  const setFilters = useCallback(
    (filters) => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev)

        Object.entries(filters).forEach(([filterKey, filterValue]) => {
          if (!filterValue) {
            newParams.delete(filterKey)
          } else {
            newParams.set(filterKey, filterValue)
          }
        })
        return newParams
      })
    },
    [setSearchParams],
  )

  return { brand, sortBy, setFilters,searchParams }
}
