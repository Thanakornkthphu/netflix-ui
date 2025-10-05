import { Stack } from "@mui/material"
import React, { useEffect } from "react"
import backgroundImg from '../Assets/login.jpg'
import Header from "../Components/Header"
import DialogLogin from "../Components/DialogLogin"
import { useNavigate } from "react-router-dom"
import { pages } from "../Routers/path"

const Login = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate(`${pages.home}`)
    }
  })

  return (
    <Stack
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundSize: "cover",
        position: "relative",
        backgroundImage: `linear-gradient(#00000069, #00000069), url(${backgroundImg})`,
        backdropFilter: "blur(10px)",
        backgroundPosition: 'center',
      }}
    >
      <Stack sx={{ padding: "30px 60px" }}>
        <Header />
        <DialogLogin />
      </Stack>
    </Stack>
  )
}

export default Login
