import React, { useState, useCallback } from "react"
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom"

import { firebaseAuth } from "../Utils/firebase-config"
import { pages } from "../Routers/path"
import { getAuthErrorMessage } from "../Utils/authErrors"
import { COLORS } from "../Utils/constants"
import { IconSpinner } from "./core/element/IconSpinner"

const DialogLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError("")
  }, [])

  const handleSignIn = useCallback(async () => {
    setIsLoading(true)
    setError("")

    try {
      const { email, password } = formData
      const response = await signInWithEmailAndPassword(
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
      console.error("Sign in error:", err.message)
    } finally {
      setIsLoading(false)
    }
  }, [formData, navigate])

  const handleKeyUp = useCallback(
    (e) => {
      if (e.key === "Enter") {
        e.preventDefault()
        handleSignIn()
      }
    },
    [handleSignIn]
  )

  return (
    <DialogContainer>
      <DialogTitle sx={styles.title}>Sign In</DialogTitle>

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
            autoComplete="current-password"
          />
        </DialogContentText>

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </DialogContent>

      <DialogActions sx={styles.actions}>
        <SubmitButton
          onClick={handleSignIn}
          variant="contained"
          disabled={isLoading}
        >
          {isLoading ? (
            <Stack sx={styles.spinnerContainer}>
              <IconSpinner sx={{ height: "45px" }} />
            </Stack>
          ) : (
            <Typography color={COLORS.text}>Sign In</Typography>
          )}
        </SubmitButton>
      </DialogActions>

      <DialogActions sx={styles.linkActions}>
        <LinkText onClick={() => navigate(pages.resetPassword)}>
          Forgot password?
        </LinkText>
      </DialogActions>

      <DialogActions sx={styles.signupActions}>
        <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
          New to Netflix?
        </Typography>
        <LinkText fontWeight={600} onClick={() => navigate(pages.signup)}>
          Sign up now.
        </LinkText>
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
    padding: "20px 68px",
  },
  linkActions: {
    justifyContent: "center",
    padding: "15px 68px 30px",
    color: COLORS.text,
  },
  signupActions: {
    justifyContent: "flex-start",
    padding: "15px 68px 30px",
    color: COLORS.text,
  },
  spinnerContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
}

// Styled Components
const DialogContainer = styled(Stack)({
  background: "rgba(0, 0, 0, 0.758)",
  width: "fit-content",
  margin: "auto",
})

const StyledInput = styled(TextField)({
  width: "20rem",
  background: COLORS.text,
  borderRadius: "4px",
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
})

const SubmitButton = styled(Button)({
  background: COLORS.primary,
  width: "100%",
  height: "45px",
  fontWeight: 500,
  boxShadow: "none",
  "&:hover": {
    background: COLORS.primary,
    boxShadow: "none",
  },
  "&:disabled": {
    background: "rgba(255, 255, 255, 0.5)",
    cursor: "not-allowed",
  },
})

const ErrorMessage = styled(DialogContentText)({
  marginTop: "20px",
  color: COLORS.primary,
  fontWeight: 600,
})

const LinkText = styled(Typography)({
  cursor: "pointer",
  "&:hover": {
    textDecoration: "underline",
  },
})

export default DialogLogin
