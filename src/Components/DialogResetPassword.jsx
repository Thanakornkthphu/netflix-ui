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
const DialogContainer = styled(Stack)({
  background: "rgba(0, 0, 0, 0.758)",
  width: "fit-content",
  margin: "auto",
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

const SuccessMessage = styled(DialogContentText)({
  marginTop: "20px",
  color: COLORS.success,
  fontWeight: 600,
})

export default DialogResetPassword
