import { Stack } from "@mui/material"
import React from "react"
import backgroundImg from '../Assets/login.jpg'
import Header from "../Components/Header"
import DialogResetPassword from "../Components/DialogResetPassword"

const Login = () => {
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
      <Stack sx={{ padding: "30px 60px", height: '100vh' }}>
        <Header />
        <DialogResetPassword />
      </Stack>
    </Stack>
  )
}

export default Login
