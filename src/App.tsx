import React, { Suspense } from "react"

import "./scss/app.scss"

import { Route, Routes } from "react-router-dom"

import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home"

// import Cart from "./pages/Cart"
const Cart = React.lazy(
  () => import(/* webpackChunkName: "Cart"*/ "./pages/Cart")
)

// import FullPizza from "./pages/FullPizza"
const FullPizza = React.lazy(
  () => import(/* webpackChunkName: "FullPizza"*/ "./pages/FullPizza")
)

// import NotFound from "./pages/NotFound"
const NotFound = React.lazy(
  () => import(/* webpackChunkName: "NotFound"*/ "./pages/NotFound")
)

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route
            path="cart"
            element={
              <Suspense fallback={<div>Йде загрузка кошика...</div>}>
                <Cart />
              </Suspense>
            }
          />
          <Route
            path="pizza/:id"
            element={
              <Suspense fallback={<div>Йде загрузка...</div>}>
                <FullPizza />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<div>Йде загрузка...</div>}>
                <NotFound />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </div>
  )
}

export default App
