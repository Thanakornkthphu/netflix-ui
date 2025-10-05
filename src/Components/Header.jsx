import { Button, Stack } from "@mui/material"
import React, { useEffect, useState } from "react"
import Logo from "../Assets/logo-netflix.png"
import { useNavigate } from "react-router-dom"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { firebaseAuth } from "../Utils/firebase-config"
import { pages } from "../Routers/path"

const Header = () => {
  const [buttonText, setButtonText] = useState('Sign In')
  const [user, setUser] = useState(null)
  const [showButton, setShowButton] = useState(true)
  
  const navigate = useNavigate()

  useEffect(() => {
    if (window.location.pathname === `${pages.login}`) {
      setShowButton(false)
    }
  }, [])

  onAuthStateChanged(firebaseAuth, (user) => {
    if (user) {
      setButtonText('Sign Out')
      setUser(user)
    }
  })

  const onSubmit = async() => {
    if (user !== null) {
      try {
        await signOut(firebaseAuth)
        localStorage.removeItem('user')
        setButtonText('Sign In')
        setUser(null)
      } catch (err) {
        console.error(err)
      }
    } else {
      navigate(`${pages.login}`)
    }
  }

  return (
    <Stack
      sx={{
        height: "60px",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <img src={Logo} alt="Netflix Logo" style={{ width: "150px", cursor: 'pointer' }} onClick={() => navigate(`${pages.home}`)}/>
        {showButton && (
          <Button
            onClick={onSubmit}
            variant="contained"
            sx={{ background: "red", cursor: 'pointer', "&:hover": { background: "red" } }}
          >
            {buttonText}
          </Button>
        )}
    </Stack>
  )
}

export default Header
