import React, { useState, useEffect, useCallback } from "react"
import { Avatar, Stack, styled } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth"
import { FaPowerOff } from "react-icons/fa"

import { firebaseAuth } from "../Utils/firebase-config"
import { pages } from "../Routers/path"
import { COLORS, NAVBAR_HEIGHT, Z_INDEX, SPACING } from "../Utils/constants"

import Logo from "../Assets/logo-netflix.png"

const SCROLL_THRESHOLD = 50
const currentUser = JSON.parse(localStorage.getItem("user"))

const Navbar = () => {
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSignOut = useCallback(async () => {
    try {
      await signOut(firebaseAuth)
      localStorage.removeItem("user")
      navigate(pages.login)
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }, [navigate])

  const handleLogoClick = useCallback(() => {
    navigate(pages.home)
  }, [navigate])

  return (
    <NavbarContainer $isScrolled={isScrolled}>
      <Stack direction="row" alignItems="center" gap={SPACING.lg}>
        <LogoImage src={Logo} alt="Netflix Logo" onClick={handleLogoClick} />
      </Stack>

      <ButtonUser>
        <Avatar
          alt={`${currentUser.email?.toUpperCase()}`}
          src="/static/images/avatar/2.jpg"
          sx={{ width: "30px", height: "30px" }}
        />
        <SignOutButton onClick={handleSignOut} aria-label="Sign out">
          <FaPowerOff />
        </SignOutButton>
      </ButtonUser>
    </NavbarContainer>
  )
}

// Styled Components
const NavbarContainer = styled(Stack)(({ theme, $isScrolled }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  height: "56px",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  color: COLORS.text,
  padding: "0 16px",
  zIndex: Z_INDEX.navbar,
  backgroundColor: $isScrolled ? COLORS.background : "transparent",
  backdropFilter: $isScrolled ? "blur(10px)" : "none",
  transition: "background-color 0.3s ease, backdrop-filter 0.3s ease",
  boxShadow: $isScrolled ? "0 2px 10px rgba(0, 0, 0, 0.3)" : "none",
  [theme.breakpoints.up("sm")]: {
    height: `${NAVBAR_HEIGHT}px`,
    padding: "0 40px",
  },
  [theme.breakpoints.up("lg")]: {
    padding: `0 ${SPACING.xxl}`,
  },
}))

const LogoImage = styled("img")(({ theme }) => ({
  width: "80px",
  cursor: "pointer",
  [theme.breakpoints.up("sm")]: { width: "100px" },
  [theme.breakpoints.up("md")]: { width: "120px" },
}))

const SignOutButton = styled("button")(({ theme }) => ({
  background: "transparent",
  border: "none",
  padding: "8px",
  borderRadius: "50%",
  cursor: "pointer",
  color: COLORS.text,
  fontSize: "14px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background-color 0.2s ease",
  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
  [theme.breakpoints.up("sm")]: { fontSize: "16px" },
  [theme.breakpoints.up("md")]: { fontSize: "18px" },
}))

const ButtonUser = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: "20px",
}))

export default Navbar
