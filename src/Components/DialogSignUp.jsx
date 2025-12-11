import React, { useState, useCallback, forwardRef } from "react"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TextField,
  styled,
} from "@mui/material"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom"

import { firebaseAuth } from "../Utils/firebase-config"
import { pages } from "../Routers/path"
import { getAuthErrorMessage } from "../Utils/authErrors"
import { COLORS } from "../Utils/constants"

const Transition = forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
))

const DialogSignUp = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const handleOpen = useCallback(() => {
    setIsOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setIsOpen(false)
    setFormData({ email: "", password: "" })
    setError("")
  }, [])

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError("")
  }, [])

  const handleCreateAccount = useCallback(async () => {
    setError("")

    try {
      const { email, password } = formData
      const response = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      )

      if (response) {
        localStorage.setItem("user", JSON.stringify(response.user))
        navigate(pages.home)
      }
    } catch (err) {
      setError(getAuthErrorMessage(err))
      console.error("Sign up error:", err.message)
    }
  }, [formData, navigate])

  const handleKeyUp = useCallback(
    (e) => {
      if (e.key === "Enter") {
        e.preventDefault()
        handleCreateAccount()
      }
    },
    [handleCreateAccount]
  )

  return (
    <>
      <GetStartedButton variant="contained" onClick={handleOpen}>
        Get Started
      </GetStartedButton>

      <StyledDialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle sx={styles.title}>Create your Account</DialogTitle>

        <DialogContent sx={styles.content}>
          <DialogContentText>
            <StyledInput
              placeholder="Email address"
              name="email"
              type="email"
              onChange={handleInputChange}
              autoComplete="email"
            />
          </DialogContentText>

          <DialogContentText sx={{ marginTop: "20px" }}>
            <StyledInput
              placeholder="Password"
              name="password"
              type="password"
              onChange={handleInputChange}
              onKeyUp={handleKeyUp}
              autoComplete="new-password"
            />
          </DialogContentText>

          {error && <ErrorMessage>{error}</ErrorMessage>}
        </DialogContent>

        <DialogActions sx={styles.actions}>
          <SubmitButton onClick={handleCreateAccount} variant="contained">
            Create
          </SubmitButton>
        </DialogActions>
      </StyledDialog>
    </>
  )
}

// Styles
const styles = {
  title: {
    color: COLORS.text,
    padding: "30px 68px",
    fontWeight: 800,
    fontSize: "2rem",
  },
  content: {
    padding: "0 68px",
  },
  actions: {
    justifyContent: "center",
    padding: "30px 68px",
  },
}

// Styled Components
const GetStartedButton = styled(Button)({
  marginTop: "20px",
  background: COLORS.primary,
  width: "12rem",
  height: "45px",
  "&:hover": {
    background: COLORS.primaryHover,
  },
})

const StyledDialog = styled(Dialog)({
  "& .MuiBackdrop-root": {
    backgroundColor: "rgba(0, 0, 0, 0.74)",
  },
  "& .MuiDialog-paper": {
    background: "rgba(84, 84, 84, 0.67)",
  },
})

const StyledInput = styled(TextField)({
  width: "25rem",
  background: COLORS.text,
  borderRadius: "4px",
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
})

const SubmitButton = styled(Button)({
  background: COLORS.primary,
  width: "12rem",
  height: "45px",
  fontWeight: 500,
  boxShadow: "none",
  "&:hover": {
    background: COLORS.primaryHover,
    boxShadow: "none",
  },
})

const ErrorMessage = styled(DialogContentText)({
  marginTop: "20px",
  color: COLORS.primary,
  fontWeight: 600,
})

export default DialogSignUp
