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
  import React, { useState } from "react"
  import { sendPasswordResetEmail } from "firebase/auth"
  import { firebaseAuth } from "../Utils/firebase-config"
  import { useNavigate } from "react-router-dom"
import { pages } from "../Routers/path"

  const DigalogResetPassword = () => {
    const [successText, setSuccessText] = useState(false)
    const [textSubmit, setTextSubmit] = useState('Reset')
    const [error, setError] = useState("")
    const [data, setData] = useState({
      email: "",
    })
  
    const navigate = useNavigate()
  
    const onChange = (e) => {
      setData({ ...data, [e.target.name]: e.target.value })
    }
  
    const resetPassword = async () => {
        setSuccessText('')
        setError('')

        try {
            const { email } = data
            await sendPasswordResetEmail(firebaseAuth, email)
            
            setSuccessText('Email sent successfully! Check your inbox.')
            setTextSubmit('Go to Login')
        } catch (err) {
            console.error(err)
            if (err.message === 'Firebase: Error (auth/invalid-email).') {
                setError('Invalid email')
            } else if (err.message === 'Firebase: Error (auth/user-not-found).') {
                setError('User not found')
            } else if (err.message === 'Firebase: Error (auth/missing-email).') {
                setError('Email is required')
            } 
        }
    }

    const goToLogin = () => {
        navigate(`${pages.login}`)
    }
  
    return (
      <DialogStyled>
          <DialogTitle
            sx={{
              color: "white",
              padding: "30px 68px",
              fontWeight: 800,
              fontSize: "2rem",
            }}
          >
            Create your Account
          </DialogTitle>
  
          <DialogContent sx={{ padding: "0 68px" }}>
            <DialogContentText>
              <InputStyled
                placeholder="Email address"
                name="email"
                onChange={onChange}
                notched={false}
              />
            </DialogContentText>
  
            {error.length > 0 && (
              <DialogContentText
                sx={{ marginTop: "20px", color: "red", fontWeight: 600 }}
              >
                {error}
              </DialogContentText>
            )}

            {successText.length > 0 && (
              <DialogContentText
                sx={{ marginTop: "20px", color: "green", fontWeight: 600 }}
              >
                {successText}
              </DialogContentText>
            )}
          </DialogContent>
  
          <DialogActions
            sx={{
              justifyContent: "center",
              padding: "30px 68px",
            }}
          >
            <Button
              onClick={successText.length > 0 ? goToLogin : resetPassword}
              variant="contained"
              sx={{
                background: "red",
                width: "12rem",
                height: "45px",
                fontWeight: 500,
                boxShadow: "none",
                "&:hover": { background: "red", boxShadow: "none" },
              }}
            >
              {textSubmit}
            </Button>
          </DialogActions>
      </DialogStyled>
    )
  }
  
  const InputStyled = styled(TextField)`
    width: 25rem;
    background: white;
    outline: none;
    border-radius: 4px;
  
    .MuiOutlinedInput-notchedOutline {
      border: none;
    }
  `
  
  const DialogStyled = styled(Stack)`
    /* background: rgba(0, 0, 0, 0.758); */
    width: 'fit-content';
    background: rgba(0, 0, 0, 0.758);
    margin: auto;
  `
  
  export default DigalogResetPassword
  