import Header from "../Components/Header"
import { Stack, Typography } from "@mui/material"
import backgroundImg from "./../Assets/login.jpg"
import DialogSignUp from "../Components/DialogSignUp"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { pages } from "../Routers/path"

const Signup = () => {
  const navigate = useNavigate()
  const currentUser = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    if (currentUser) { 
      navigate(`${pages.home}`)
    }
  }, [currentUser])

  return (
    <Stack
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundSize: "cover",
        position: "relative",
        backgroundImage: `linear-gradient(#00000069, #00000069), url(${backgroundImg})`,
        backdropFilter: "blur(10px)",
        backgroundPosition: 'center',
      }}
    >
      <Stack sx={{ padding: "30px 60px" }}>
        <Header />

        <Stack
          mt="100px"
          sx={{
            color: "white",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h1"
            fontWeight={"800"}
            fontSize={"48px"}
            lineHeight={"65px"}
          >
            Unlimited movies, TV shows and more
          </Typography>
          <Typography
            variant="h4"
            fontWeight={"600"}
            fontSize={"30px"}
            lineHeight={"65px"}
          >
            Watch anywhere. Cancel anytime.
          </Typography>
          <Typography variant="h6" fontWeight={"600"} lineHeight={"65px"}>
            Ready to watch? Enter your email to create or restart your
            membership.
          </Typography>

          <DialogSignUp />
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Signup
