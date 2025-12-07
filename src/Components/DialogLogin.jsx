import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField, Typography, styled } from '@mui/material'
import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { firebaseAuth } from '../Utils/firebase-config'
import { pages } from '../Routers/path'
import { IconSpinner } from './core/element/IconSpinner'

const DialogLogin = () => {
    const [error, setError] = useState('')
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value})
    }

    const submitSignIn = async() => {
        setLoading(true)
        try {
            const { email, password } = data
            const response = await signInWithEmailAndPassword(firebaseAuth, email, password)

            if (response) {
                localStorage.setItem('user', JSON.stringify(response.user))
                navigate(`${pages.home}`)
            }
            
        } catch (err) {
            if (err.message === 'Firebase: Error (auth/email-already-in-use).') {
                setError("Email already in use")
              } else if (err.message === 'Firebase: Error (auth/weak-password).') {
                setError("Password should be at least 6 characters")
              } else if (err.message === 'Firebase: Error (auth/invalid-email).') {
                setError("Invalid email")
              } else if (err.message === 'INVALID_LOGIN_CREDENTIALS') {
                setError("Invalid email or password")
              } else {
                setError("An error occurred")
              }
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const onKeyUp = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            submitSignIn()
        }
    }
  return (
    <DialogStyled
        open={true}
        keepMounted
      >
        <DialogTitle
          sx={{
            color: "white",
            padding: "30px 68px",
            fontWeight: 800,
            fontSize: "2rem",
          }}
        >
          Sign In
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
          <DialogContentText sx={{ marginTop: "20px" }}>
            <InputStyled
              placeholder="Password"
              name="password"
              onChange={onChange}
              notched={false}
              type="password"
              onKeyUp={onKeyUp} 
            />
          </DialogContentText>

          {error.length > 0 && (
            <DialogContentText
              sx={{ marginTop: "20px", color: "red", fontWeight: 600 }}
            >
              {error}
            </DialogContentText>
          )}
        </DialogContent>

        <DialogActions
          sx={{
            justifyContent: "center",
            padding: "20px 68px 20px 68px",
          }}
        >
          <Button
            onClick={submitSignIn}
            variant="contained"
            disabled={loading}
            sx={{
              background: "red",
              width: "100%",
              height: "45px",
              fontWeight: 500,
              boxShadow: "none",
              "&:hover": { background: "red", boxShadow: "none" },
              "&:disabled": { background: "rgba(255, 255, 255, 0.5)", cursor: "not-allowed" },
            }}
          >
            {!loading ? (
              <Stack sx={{ width: '100%', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <IconSpinner sx={{ height: '45px' }}/> 
              </Stack>
            ) : (
              <Typography color={'red'}>
                Sign In
            </Typography>
            )}
          </Button>
        </DialogActions>

        <DialogActions
            sx={{
                justifyContent: "center",
                padding: "15px 68px 30px 68px",
                color: 'white'
            }}
        >
            <Typography sx={{ cursor: 'pointer' }} onClick={() => navigate(`${pages.resetPassword}`)}>
                Forgot password?
            </Typography>
        </DialogActions>

        <DialogActions
            sx={{
                justifyContent: "flex-start",
                padding: "15px 68px 30px 68px",
                color: 'white'
            }}
        >
            <Typography sx={{ color: 'rgba(255,255,255,0.7)' }}>
                New to Netflix?
            </Typography>
            <Typography sx={{ fontWeight: 600, cursor: 'pointer' }} onClick={() => navigate(`${pages.signup}`)}>
                Sign up now.
            </Typography>
        </DialogActions>
      </DialogStyled>
  )
}

const InputStyled = styled(TextField)`
  width: 20rem;
  background: white;
  outline: none;
  border-radius: 4px;

  .MuiOutlinedInput-notchedOutline {
    border: none;
  }
`

const DialogStyled = styled(Stack)`
  background: rgba(0, 0, 0, 0.758);
  width: fit-content;
  margin: auto;
`

export default DialogLogin