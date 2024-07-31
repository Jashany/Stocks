import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './Store'

function App() {

  return (
    <>
      <Routes>
        <Provider store={store}>
        <Route path="/" element={<Home />} />
        <Route path="/Stocks" element={<Stocks />} />
  </Provider>
      </Routes>
    </>
  )
}

export default App
