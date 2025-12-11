import { Stack } from "@mui/material"
import React, { useState, useEffect } from "react"
import Logo from "../Assets/logo-netflix.png"
import { useNavigate } from "react-router-dom"
import { FaPowerOff } from "react-icons/fa"
import { signOut } from "firebase/auth"
import { firebaseAuth } from "../Utils/firebase-config"
import { pages } from "../Routers/path"

const Navbar = () => {
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const onSubmitSignOut = async () => {
    try {
      await signOut(firebaseAuth)
      localStorage.removeItem("user")
      navigate(`${pages.login}`)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Stack
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "70px",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
        padding: "0 60px",
        zIndex: 1000,
        backgroundColor: isScrolled ? "rgb(20, 20, 20)" : "transparent",
        backdropFilter: isScrolled ? "blur(10px)" : "none",
        transition: "background-color 0.3s ease, backdrop-filter 0.3s ease",
        boxShadow: isScrolled ? "0 2px 10px rgba(0, 0, 0, 0.3)" : "none",
      }}
    >
      <Stack flexDirection={"row"} alignItems={"center"} gap={"30px"}>
        <img
          src={Logo}
          alt="Netflix Logo"
          style={{ width: "120px", cursor: "pointer" }}
          onClick={() => navigate(pages.home)}
        />
      </Stack>
      <Stack
        sx={{
          padding: "8px",
          borderRadius: "50%",
          cursor: "pointer",
          transition: "background-color 0.2s ease",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
        }}
        onClick={onSubmitSignOut}
      >
        <FaPowerOff style={{ fontSize: "18px" }} />
      </Stack>
    </Stack>
  )
}

export default Navbar
