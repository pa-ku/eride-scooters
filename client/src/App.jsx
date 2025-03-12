import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'
import './css/global.css'
import './css/animations.css'

import Layout from './layout/Layout'
import Home from './pages/Home'

import Login from './pages/SignIn'
import Register from './pages/SignUp'
import Profile from './pages/Profile'
import Favorites from './pages/Favorites'

import ProductShowcase from './pages/Product'
import AllProducts from './pages/ProductList'

import ProtectedRoutes from './layout/ProtectedRoute'
import UserAlreadyAuth from './layout/UserAlreadyAuth'
import NoAuth from './pages/NoAuth'

const LazyAbout = React.lazy(() => import('#pages/About'))

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route index path="/" element={<Home />} />
              <Route
                path="about"
                element={
                  <React.Suspense fallback="Loading...">
                    <LazyAbout />
                  </React.Suspense>
                }
              />
              <Route path="/product">
                <Route path="scooters" element={<AllProducts />} />
                <Route path="id/:id" element={<ProductShowcase />} />
              </Route>

              <Route path="/user">
                <Route element={<UserAlreadyAuth />}>
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                  <Route path="account" element={<NoAuth />} />
                </Route>
                <Route element={<ProtectedRoutes />}>
                  <Route path="favorites" element={<Favorites />} />
                  <Route path="profile" element={<Profile />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
