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
      <Stack sx={{ padding: { xs: "16px", sm: "24px 40px", md: "30px 60px" } }}>
        <Header />

        <Stack
          sx={{
            mt: { xs: "40px", sm: "60px", md: "100px" },
            color: COLORS.text,
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            flexDirection: "column",
            px: { xs: "8px", sm: "16px", md: 0 },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" },
              lineHeight: { xs: 1.3, sm: 1.4, md: "65px" },
            }}
          >
            Unlimited movies, TV shows and more
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              fontSize: { xs: "1rem", sm: "1.25rem", md: "1.875rem" },
              lineHeight: { xs: 1.4, sm: 1.5, md: "65px" },
              mt: { xs: "8px", sm: "12px", md: 0 },
            }}
          >
            Watch anywhere. Cancel anytime.
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              fontSize: { xs: "0.875rem", sm: "1rem", md: "1.25rem" },
              lineHeight: { xs: 1.4, sm: 1.5, md: "65px" },
              mt: { xs: "12px", sm: "16px", md: 0 },
            }}
          >
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
