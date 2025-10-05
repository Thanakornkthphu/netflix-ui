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
import React, { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { firebaseAuth } from "../Utils/firebase-config"
import { useNavigate } from "react-router-dom"
import { pages } from "../Routers/path"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const DigalogSignUp = () => {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState("")
  const [data, setData] = useState({
    email: "",
    password: "",
  })

  const navigate = useNavigate()

  const handleOpenDialog = () => {
    setOpen(true)
  }

  const handleCloseDialog = () => {
    setOpen(false)
    setData({ email: "", password: "" })
    setError("")
  }

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const createAccount = async () => {
    setError("")

    try {
      const { email, password } = data
      const response = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      )

      if (response) {
        localStorage.setItem('user', JSON.stringify(response.user))
        navigate(`${pages.home}`)
      }
    } catch (err) {
      console.error(err)

      if (err.message === "Firebase: Error (auth/email-already-in-use).") {
        setError("Email already in use")
      } else if (err.message === "Firebase: Error (auth/weak-password).") {
        setError("Password should be at least 6 characters")
      } else if (err.message === "Firebase: Error (auth/invalid-email).") {
        setError("Invalid email")
      }
    }
  }

  const onKeyUp = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      createAccount()
    }
  }

  return (
    <>
      <Button
        variant="contained"
        sx={{
          marginTop: "20px",
          background: "red",
          width: "12rem",
          height: "45px",
          "&:hover": { background: "red" },
        }}
        onClick={() => handleOpenDialog()}
      >
        Get Started
      </Button>

      <DialogStyled
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
      >
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
            padding: "30px 68px",
          }}
        >
          <Button
            onClick={createAccount}
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
            Create
          </Button>
        </DialogActions>
      </DialogStyled>
    </>
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

const DialogStyled = styled(Dialog)`
  background: none;

  .MuiBackdrop-root {
    background-color: rgb(0 0 0 / 74%);
  }

  .MuiDialog-paper {
    background: rgb(84 84 84 / 67%);
  }
`

export default DigalogSignUp
