import { useEffect, useState, useCallback } from 'react'

export function useOutsideClick (ref) {
  const [isOpen, setIsOpen] = useState(false)

  const handleClickOutside = useCallback(
    (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false)
      }
    },
    [ref, setIsOpen]
  )

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleClickOutside])

  return { isOpen, setIsOpen }
}
