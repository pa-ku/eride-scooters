import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

export function useProductFilters () {
  const [searchParams, setSearchParams] = useSearchParams()

  const category = searchParams.get('category')
  const sortBy = searchParams.get('sortBy')

  // Siempre que se retorne una funcion en un hook usar el useCallback
  const setFilters = useCallback(
    (filters) => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev)

        // Handle search parameter
        if (filters.search !== undefined) {
          filters.search
            ? newParams.set('search', filters.search)
            : newParams.delete('search')
        }

        // Handle category parameter
        if (filters.category !== undefined) {
          filters.category
            ? newParams.set('category', filters.category)
            : newParams.delete('category')
        }

        // Handle sortBy parameter
        if (filters.sortBy !== undefined) {
          filters.sortBy
            ? newParams.set('sortBy', filters.sortBy)
            : newParams.delete('sortBy')
        }

        return newParams
      })
    },
    [setSearchParams]
  )

  return { category, sortBy, setFilters }
}
