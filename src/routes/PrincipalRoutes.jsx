import React from 'react'
import { Route, Routes } from 'react-router'
import AdminPage from '../pages/AdminPage'
import NotFoundScreen from '../pages/NotFoundScreen'

const PrincipalRoutes = () => {
  return (
    <Routes>
        <Route path="*" element={<NotFoundScreen />} />
        <Route path="/adminPage" element={<AdminPage/>} />
    </Routes>
  )
}

export default PrincipalRoutes