import { useEffect, useState } from 'react'
import { API_ROUTE } from '../services/api/API_ROUTE'
import { useAuth } from '#context/AuthContext'
import { useNavigate } from 'react-router'

export default function FavButton ({ productId, className }) {
  const { isAuth, user, setUser } = useAuth()
  const [isFav, setIsFav] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      const isProductFavorited = user.favorites.includes(productId)
      setIsFav(isProductFavorited)
    }
  }, [user, productId])

  async function addFavorite (productId) {
    try {
      const res = await fetch(`${API_ROUTE}/user/favorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productId
        }),
        credentials: 'include'
      })
      if (!res.ok) throw new Error('No se pudo crear el favorito')
      const data = await res.json()
      setUser((prevUser) => ({
        ...prevUser,
        favorites: data.favorites
      }))
    } catch (err) {
      console.error('¡No se pudo crear el favorito!', err)
    }
  }

  const handleFavorite = () => {
    if (!isAuth) {
      navigate('/user/account')
    } else {
      setIsFav(!isFav)
      addFavorite(productId)
    }
  }

  return (
    <>
      <button
        onClick={handleFavorite}
        className={`${isFav ? 'fill-red-400' : 'fill-white'} ${className && className} relative z-20 size-8 items-center justify-center rounded-full stroke-red-500 p-1`}
      >
        <svg
          className='h-full w-full'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572' />
        </svg>
      </button>
    </>
  )
}
