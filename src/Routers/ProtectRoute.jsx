import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import { pages } from './path'
import Player from '../Pages/Player'

const ProtectRoute = () => {

  if (!localStorage.getItem('user')) {
      return <Navigate to={`${pages.signup}`} replace/>
  }

  return (   
    <Routes>
        <Route index element={<Home />} />
        <Route path={`${pages.player}`} element={<Player />} />
    </Routes>
  )
}

export default ProtectRoute