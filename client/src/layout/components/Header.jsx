import imgLogo from '#assets/icons/logo.webp'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'
import { useAuth } from '#context/AuthContext'
import LoggedMenu from './LoggedMenu'
import { useOutsideClick } from '#hooks/useOutsideClick'
import { Heart, User, Menu, Search } from 'lucide-react'
import { useRef } from 'react'

export default function Header() {
  const { isAuth } = useAuth()
  const menuRef = useRef()
  const { isOpen: menuIsOpen, setIsOpen } = useOutsideClick(menuRef)

  return (
    <>
      <header className="flex h-14 w-full items-center justify-between bg-slate-800 px-2 md:px-10">
        <Link className="w-max" title="Home" to="/">
          <img className="size-32 object-contain" src={imgLogo} alt="" />
        </Link>
        <nav className="z-50 hidden items-center text-sm justify-end gap-5 md:flex">
          <SearchBar />
          <Link
            className="rounded-lg px-3 py-1 text-white hover:bg-gray-700"
            to="/product/scooters"
          >
            Monopatines
          </Link>
          {!isAuth && (
            <>
              <Link
                className="bg-primary-700 hover:bg-primary-600 rounded-lg px-3 py-1 text-white"
                to="/user/login"
                data-test-id="btn-login"
              >
                Ingresar
              </Link>
              <Link
                className="bg-primary-700 hover:bg-primary-600 rounded-lg px-3 py-1 text-white"
                to="/user/register"
              >
                Registrarse
              </Link>
            </>
          )}
          {isAuth && (
            <>
              <Link
                to="user/favorites"
                className="flex items-center justify-center gap-1 rounded-lg p-2 text-white hover:bg-gray-700"
              >
                <Heart fill="white" size={15} />
                Favoritos
              </Link>
              <span className="relative">
                <button
                  onClick={() => setIsOpen(true)}
                  role="button open profile"
                  data-test-id="btn-open-profile"
                  className="flex items-center justify-center rounded-full bg-gray-200 p-1"
                >
                  <User />
                </button>
                {menuIsOpen && (
                  <LoggedMenu menuRef={menuRef} setIsOpen={setIsOpen} />
                )}
              </span>
            </>
          )}
        </nav>
        <NavMobile />
      </header>
    </>
  )
}

function NavMobile() {
  const menuRef = useRef()
  const { isOpen: openMenu, setIsOpen: setOpenMenu } = useOutsideClick(menuRef)

  return (
    <nav className="flex items-center justify-center gap-3 text-white md:hidden">
      <button className="rounded-lg bg-slate-600 p-1">
        <Search />
      </button>

      <div ref={menuRef} className="relative flex rounded-lg bg-slate-600 p-1">
        <button onClick={() => setOpenMenu(!openMenu)}>
          <Menu />
        </button>
        {openMenu && <BurguerMenu setOpenMenu={setOpenMenu} />}
      </div>
    </nav>
  )
}

function BurguerMenu({ setOpenMenu }) {
  const navButtons = [
    {
      label: 'Ingresar',
      url: '/user/login',
    },
    { label: 'Registrarse', url: '/user/register' },
    { label: 'Monopatines', url: '/product/scooters' },
    { label: 'Ofertas', url: '/product/scooters' },
    { label: 'Sobre Nosotros', url: '/aboutus' },
  ]
  return (
    <div className="absolute right-2 top-10 z-50 flex flex-col items-start gap-3 rounded-lg bg-white py-2 text-black shadow-lg">
      {navButtons.map(({ label, url }) => (
        <NavButton key={label} to={url} setOpenMenu={setOpenMenu}>
          {label}
        </NavButton>
      ))}
    </div>
  )
}
function NavButton({ children, to, setOpenMenu }) {
  return (
    <Link
      onClick={() => setOpenMenu(false)}
      to={to}
      className="hover:bg-primary-500 flex w-full items-center gap-2 px-8 py-2 hover:text-white"
    >
      {children}
    </Link>
  )
}
