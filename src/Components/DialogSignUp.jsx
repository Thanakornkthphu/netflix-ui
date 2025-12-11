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

          <DialogContentText
            sx={{ marginTop: { xs: "12px", sm: "16px", md: "20px" } }}
          >
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

// Responsive Styles
const styles = {
  title: {
    color: COLORS.text,
    padding: { xs: "20px 24px", sm: "24px 48px", md: "30px 68px" },
    fontWeight: 800,
    fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
  },
  content: {
    padding: { xs: "0 24px", sm: "0 48px", md: "0 68px" },
  },
  actions: {
    justifyContent: "center",
    padding: { xs: "20px 24px", sm: "24px 48px", md: "30px 68px" },
  },
}

// Styled Components
const GetStartedButton = styled(Button)(({ theme }) => ({
  marginTop: "20px",
  background: COLORS.primary,
  "&:hover": { background: COLORS.primaryHover },
  width: "10rem",
  height: "40px",
  fontSize: "14px",
  [theme.breakpoints.up("sm")]: { width: "11rem", height: "42px" },
  [theme.breakpoints.up("md")]: {
    width: "12rem",
    height: "45px",
    fontSize: "16px",
  },
}))

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiBackdrop-root": { backgroundColor: "rgba(0, 0, 0, 0.74)" },
  "& .MuiDialog-paper": {
    background: "rgba(84, 84, 84, 0.67)",
    margin: "16px",
    width: "calc(100% - 32px)",
    [theme.breakpoints.up("sm")]: {
      margin: "32px",
      width: "auto",
      minWidth: "380px",
    },
  },
}))

const StyledInput = styled(TextField)(({ theme }) => ({
  background: COLORS.text,
  borderRadius: "4px",
  width: "100%",
  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
  [theme.breakpoints.up("sm")]: { width: "20rem" },
  [theme.breakpoints.up("md")]: { width: "25rem" },
}))

const SubmitButton = styled(Button)(({ theme }) => ({
  background: COLORS.primary,
  fontWeight: 500,
  boxShadow: "none",
  "&:hover": { background: COLORS.primaryHover, boxShadow: "none" },
  width: "10rem",
  height: "40px",
  [theme.breakpoints.up("sm")]: { width: "11rem", height: "42px" },
  [theme.breakpoints.up("md")]: { width: "12rem", height: "45px" },
}))

const ErrorMessage = styled(DialogContentText)(({ theme }) => ({
  color: COLORS.primary,
  fontWeight: 600,
  marginTop: "12px",
  fontSize: "13px",
  [theme.breakpoints.up("sm")]: { marginTop: "16px", fontSize: "14px" },
  [theme.breakpoints.up("md")]: { marginTop: "20px" },
}))

export default DialogSignUp
