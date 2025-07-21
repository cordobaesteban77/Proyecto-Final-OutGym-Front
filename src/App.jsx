import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Componente from './components/componente'
import NavbarApp from './components/NavbarApp'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <NavbarApp />
        <Routes>
          <Route path="/" element={<Componente />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
