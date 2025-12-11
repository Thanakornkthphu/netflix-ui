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

        <DialogContentText
          sx={{ marginTop: { xs: "12px", sm: "16px", md: "20px" } }}
        >
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

// Responsive styles using sx prop
const responsivePadding = { xs: "0 24px", sm: "0 48px", md: "0 68px" }
const styles = {
  title: {
    color: COLORS.text,
    padding: { xs: "20px 24px", sm: "24px 48px", md: "30px 68px" },
    fontWeight: 800,
    fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
  },
  content: {
    padding: responsivePadding,
  },
  actions: {
    justifyContent: "center",
    padding: { xs: "16px 24px", sm: "18px 48px", md: "20px 68px" },
  },
  linkActions: {
    justifyContent: "center",
    padding: {
      xs: "12px 24px 24px",
      sm: "14px 48px 28px",
      md: "15px 68px 30px",
    },
    color: COLORS.text,
  },
  signupActions: {
    justifyContent: "flex-start",
    padding: {
      xs: "12px 24px 24px",
      sm: "14px 48px 28px",
      md: "15px 68px 30px",
    },
    color: COLORS.text,
    flexWrap: "wrap",
    gap: "4px",
  },
  spinnerContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
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
  [theme.breakpoints.up("sm")]: { width: "18rem" },
  [theme.breakpoints.up("md")]: { width: "20rem" },
}))

const SubmitButton = styled(Button)(({ theme }) => ({
  background: COLORS.primary,
  width: "100%",
  fontWeight: 500,
  boxShadow: "none",
  height: "40px",
  "&:hover": { background: COLORS.primary, boxShadow: "none" },
  "&:disabled": {
    background: "rgba(255, 255, 255, 0.5)",
    cursor: "not-allowed",
  },
  [theme.breakpoints.up("sm")]: { height: "42px" },
  [theme.breakpoints.up("md")]: { height: "45px" },
}))

const ErrorMessage = styled(DialogContentText)(({ theme }) => ({
  color: COLORS.primary,
  fontWeight: 600,
  marginTop: "12px",
  fontSize: "13px",
  [theme.breakpoints.up("sm")]: { marginTop: "16px", fontSize: "14px" },
  [theme.breakpoints.up("md")]: { marginTop: "20px" },
}))

const LinkText = styled(Typography)(({ theme }) => ({
  cursor: "pointer",
  fontSize: "14px",
  "&:hover": { textDecoration: "underline" },
  [theme.breakpoints.up("sm")]: { fontSize: "16px" },
}))

export default DialogLogin
