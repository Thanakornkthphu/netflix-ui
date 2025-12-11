import React, { useEffect } from "react"
import { Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

import Header from "../Components/Header"
import DialogSignUp from "../Components/DialogSignUp"
import { pages } from "../Routers/path"
import { AUTH_PAGE_STYLES, COLORS } from "../Utils/constants"

import backgroundImg from "../Assets/login.jpg"

const Signup = () => {
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
      <Stack sx={{ padding: "30px 60px" }}>
        <Header />

        <Stack
          mt="100px"
          sx={{
            color: COLORS.text,
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h1"
            fontWeight={800}
            fontSize="48px"
            lineHeight="65px"
          >
            Unlimited movies, TV shows and more
          </Typography>
          <Typography
            variant="h4"
            fontWeight={600}
            fontSize="30px"
            lineHeight="65px"
          >
            Watch anywhere. Cancel anytime.
          </Typography>
          <Typography variant="h6" fontWeight={600} lineHeight="65px">
            Ready to watch? Enter your email to create or restart your
            membership.
          </Typography>

          <DialogSignUp />
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Signup
