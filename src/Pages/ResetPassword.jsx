import React from "react"
import { Stack } from "@mui/material"

import Header from "../Components/Header"
import DialogResetPassword from "../Components/DialogResetPassword"
import { AUTH_PAGE_STYLES } from "../Utils/constants"

import backgroundImg from "../Assets/login.jpg"

const ResetPassword = () => {
  return (
    <Stack
      sx={{
        ...AUTH_PAGE_STYLES,
        backgroundImage: `linear-gradient(#00000069, #00000069), url(${backgroundImg})`,
      }}
    >
      <Stack sx={{ padding: "30px 60px", height: "100vh" }}>
        <Header />
        <DialogResetPassword />
      </Stack>
    </Stack>
  )
}

export default ResetPassword
