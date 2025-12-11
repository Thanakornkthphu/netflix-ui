import React, { useState, useEffect, useCallback } from "react"
import { Stack, styled } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth"
import { FaPowerOff } from "react-icons/fa"

import { firebaseAuth } from "../Utils/firebase-config"
import { pages } from "../Routers/path"
import { COLORS, NAVBAR_HEIGHT, Z_INDEX, SPACING } from "../Utils/constants"

import Logo from "../Assets/logo-netflix.png"

const SCROLL_THRESHOLD = 50

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

      <SignOutButton onClick={handleSignOut} aria-label="Sign out">
        <FaPowerOff />
      </SignOutButton>
    </NavbarContainer>
  )
}

// Styled Components
const NavbarContainer = styled(Stack)(({ $isScrolled }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  height: `${NAVBAR_HEIGHT}px`,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  color: COLORS.text,
  padding: `0 ${SPACING.xxl}`,
  zIndex: Z_INDEX.navbar,
  backgroundColor: $isScrolled ? COLORS.background : "transparent",
  backdropFilter: $isScrolled ? "blur(10px)" : "none",
  transition: "background-color 0.3s ease, backdrop-filter 0.3s ease",
  boxShadow: $isScrolled ? "0 2px 10px rgba(0, 0, 0, 0.3)" : "none",
}))

const LogoImage = styled("img")({
  width: "120px",
  cursor: "pointer",
})

const SignOutButton = styled("button")({
  background: "transparent",
  border: "none",
  padding: "8px",
  borderRadius: "50%",
  cursor: "pointer",
  color: COLORS.text,
  fontSize: "18px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background-color 0.2s ease",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
})

export default Navbar
