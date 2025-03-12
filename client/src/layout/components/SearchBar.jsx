import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useGetProductNames from '#services/api/useGetProductNames.jsx'
import { SearchIcon } from 'lucide-react'

export default function SearchBar({ className }) {
  const searchBarRef = useRef(null)
  const [query, setQuery] = useState('')
  const [filterByQuery, setFilterByQuery] = useState([])
  const [showSearchBox, setShowSearchBox] = useState()
  const { data, loading, requestNames } = useGetProductNames()

  function handleInputMenu() {
    requestNames()
    setShowResults(true)
  }

  useEffect(() => {
    const filteredByQuery = data.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase()),
    )
    setFilterByQuery(filteredByQuery)
  }, [query])

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        setShowSearchBox(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [setQuery])

  return (
    <section className="relative" ref={searchBarRef}>
      <button
        onClick={() => setShowSearchBox(true)}
        className="flex items-center justify-center gap-1 rounded-lg p-1 px-2 text-white hover:bg-gray-700"
      >
        <SearchIcon size={18} />
        Buscar
      </button>

      {showSearchBox && (
        <div className="roounded-lg border-primary-300 bg-primary-800 absolute right-5 w-96 rounded-lg border text-white">
          <input
            className="bg-primary-800 border-primary-100 placeholder:text-primary-300 w-full rounded-lg p-3"
            value={query}
            placeholder="Busca tu marca favorita..."
            onClick={handleInputMenu}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
          />

          <div className="w-full">
            {query !== '' &&
              filterByQuery.slice(0, 6).map(({ title, _id: id }) => (
                <Link
                  className="item-center hover:bg-primary-500 flex justify-start rounded-md p-2 hover:text-white"
                  key={title}
                  to={`/product/id/${id}`}
                  onClick={() => setQuery('')}
                >
                  {title}
                </Link>
              ))}
          </div>
        </div>
      )}
    </section>
  )
}
