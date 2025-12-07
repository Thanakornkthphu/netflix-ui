import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signup from "../Pages/Signup"
import Login from "../Pages/Login"
import ResetPassword from "../Pages/ResetPassword"
import ProtectRoute from './ProtectRoute'
import { pages } from './path'
import Player from "../Pages/Player"

const AppRoutes = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="*" element={<ProtectRoute/>} />
        <Route exact path={pages.signup} element={<Signup />} />
        <Route exact path={pages.login} element={<Login />} />
        <Route exact path={pages.resetPassword} element={<ResetPassword />} />
        <Route exact path={pages.player} element={<Player />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
