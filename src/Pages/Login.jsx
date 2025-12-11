import React, { useEffect } from "react"
import { Stack } from "@mui/material"
import { useNavigate } from "react-router-dom"

import Header from "../Components/Header"
import DialogLogin from "../Components/DialogLogin"
import { pages } from "../Routers/path"
import { AUTH_PAGE_STYLES } from "../Utils/constants"

import backgroundImg from "../Assets/login.jpg"

const Login = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      navigate(pages.home)
    }
  }, [navigate])

  return (
    <Stack
      sx={{
        ...AUTH_PAGE_STYLES,
        backgroundImage: `linear-gradient(#00000069, #00000069), url(${backgroundImg})`,
      }}
    >
      <Stack sx={{ padding: { xs: "16px", sm: "24px 40px", md: "30px 60px" } }}>
        <Header />
        <DialogLogin />
      </Stack>
    </Stack>
  )
}

export default Login
