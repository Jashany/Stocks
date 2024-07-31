import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './Store'
import Home from './Pages/Home'
import Stocks from './Pages/Stock'
import InitialBuy from './Pages/IntitialBuy'

function App() {

  return (
    <>
        <Provider store={store}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Stocks" element={<Stocks />} />
        <Route path="/Buy" element={<InitialBuy />} />
      </Routes>
        </Provider>
    </>
  )
}

export default App
