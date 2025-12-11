import React, { useEffect, useState, useCallback } from "react"
import { Button, Stack, styled } from "@mui/material"
import { useNavigate, useLocation } from "react-router-dom"
import { onAuthStateChanged, signOut } from "firebase/auth"

import { firebaseAuth } from "../Utils/firebase-config"
import { pages } from "../Routers/path"
import { COLORS } from "../Utils/constants"

import Logo from "../Assets/logo-netflix.png"

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showButton, setShowButton] = useState(true)

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Hide button on login page
    setShowButton(location.pathname !== pages.login)
  }, [location.pathname])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setIsAuthenticated(!!user)
    })
    return () => unsubscribe()
  }, [])

  const handleAuthAction = useCallback(async () => {
    if (isAuthenticated) {
      try {
        await signOut(firebaseAuth)
        localStorage.removeItem("user")
        setIsAuthenticated(false)
      } catch (error) {
        console.error("Sign out error:", error)
      }
    } else {
      navigate(pages.login)
    }
  }, [isAuthenticated, navigate])

  const handleLogoClick = useCallback(() => {
    navigate(pages.home)
  }, [navigate])

  return (
    <HeaderContainer>
      <LogoImage src={Logo} alt="Netflix Logo" onClick={handleLogoClick} />

      {showButton && (
        <AuthButton onClick={handleAuthAction} variant="contained">
          {isAuthenticated ? "Sign Out" : "Sign In"}
        </AuthButton>
      )}
    </HeaderContainer>
  )
}

// Styled Components
const HeaderContainer = styled(Stack)({
  height: "60px",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
})

const LogoImage = styled("img")({
  width: "150px",
  cursor: "pointer",
})

const AuthButton = styled(Button)({
  background: COLORS.primary,
  "&:hover": {
    background: COLORS.primaryHover,
  },
})

export default Header
