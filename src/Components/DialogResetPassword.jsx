import React, { useState, useCallback } from "react"
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
  styled,
} from "@mui/material"
import { sendPasswordResetEmail } from "firebase/auth"
import { useNavigate } from "react-router-dom"

import { firebaseAuth } from "../Utils/firebase-config"
import { pages } from "../Routers/path"
import { getAuthErrorMessage } from "../Utils/authErrors"
import { COLORS } from "../Utils/constants"

const DialogResetPassword = () => {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const navigate = useNavigate()

  const handleInputChange = useCallback((e) => {
    setEmail(e.target.value)
    setError("")
  }, [])

  const handleResetPassword = useCallback(async () => {
    setError("")
    setIsSuccess(false)

    try {
      await sendPasswordResetEmail(firebaseAuth, email)
      setIsSuccess(true)
    } catch (err) {
      setError(getAuthErrorMessage(err))
      console.error("Reset password error:", err.message)
    }
  }, [email])

  const handleGoToLogin = useCallback(() => {
    navigate(pages.login)
  }, [navigate])

  const handleSubmit = isSuccess ? handleGoToLogin : handleResetPassword

  return (
    <DialogContainer>
      <DialogTitle sx={styles.title}>Reset Password</DialogTitle>

      <DialogContent sx={styles.content}>
        <DialogContentText>
          <StyledInput
            placeholder="Email address"
            name="email"
            type="email"
            value={email}
            onChange={handleInputChange}
            autoComplete="email"
          />
        </DialogContentText>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {isSuccess && (
          <SuccessMessage>
            Email sent successfully! Check your inbox.
          </SuccessMessage>
        )}
      </DialogContent>

      <DialogActions sx={styles.actions}>
        <SubmitButton onClick={handleSubmit} variant="contained">
          {isSuccess ? "Go to Login" : "Reset"}
        </SubmitButton>
      </DialogActions>
    </DialogContainer>
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
const DialogContainer = styled(Stack)(({ theme }) => ({
  background: "rgba(0, 0, 0, 0.758)",
  margin: "auto",
  borderRadius: "4px",
  width: "100%",
  maxWidth: "100%",
  [theme.breakpoints.up("sm")]: { width: "fit-content", minWidth: "380px" },
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

const SuccessMessage = styled(DialogContentText)(({ theme }) => ({
  color: COLORS.success,
  fontWeight: 600,
  marginTop: "12px",
  fontSize: "13px",
  [theme.breakpoints.up("sm")]: { marginTop: "16px", fontSize: "14px" },
  [theme.breakpoints.up("md")]: { marginTop: "20px" },
}))

export default DialogResetPassword
