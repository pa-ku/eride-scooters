import { useProductFilters } from '#src/hooks/useProductFilters.jsx'
import { PRODUCT_FILTERS } from '../filters'

export default function ProductListFilters() {
  const { brand, sortBy } = useProductFilters()

  return (
    <>
      <FilterColumn
        filterKey="brand"
        title="Marca"
        activeFilter={brand}
        filters={PRODUCT_FILTERS.brands}
      />
      <FilterColumn
        filterKey="sortBy"
        title="Precio"
        activeFilter={sortBy}
        filters={PRODUCT_FILTERS.orderBy}
      />
    </>
  )
}

function FilterColumn({ filters, title, filterKey, activeFilter }) {
  const { setFilters } = useProductFilters()

  function handleFilterChange(value) {
    if (value === activeFilter) return setFilters({ [filterKey]: undefined })
    setFilters({ [filterKey]: value })
  }

  return (
    <div className="flex flex-wrap space-y-1 md:block">
      <h3 className="text-xl font-bold">{title}</h3>
      <span className="flex flex-col items-start gap-1 pl-1">
        {filters.map(({ label, value }) => (
          <button
            onClick={() => handleFilterChange(value)}
            key={value}
            className={`${value === activeFilter && 'bg-primary-100 text-primary-700'} rounded-lg px-2`}
          >
            {label}
          </button>
        ))}
      </span>
    </div>
  )
}
