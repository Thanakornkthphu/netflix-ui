import { Stack, styled } from "@mui/material"
import React from "react"
import videoTrailer from '../Assets/trailer.mp4'
import { FaAngleLeft } from 'react-icons/fa'
import { useNavigate } from "react-router-dom"

const Player = () => {
  const navigate = useNavigate()
  return (
    <Container>
        <FaAngleLeft style={{ fontSize: '40px', color: 'white', cursor: 'pointer', position: 'absolute', top: '20px', left: '20px', zIndex: 1 }} onClick={() => navigate(-1)}/>
        <Iframe
          src="https://www.youtube.com/embed/sBEvEcpnG7k?autoplay=1&mute=0&loop=1&controls=1&playlist=sBEvEcpnG7k"
          allow="autoplay; fullscreen"
        />
    </Container>
  )
}

const Container = styled(Stack)`
  width: 100vw;
  height: 100vh;
  overflow: hidden; 
  position: relative; 
`

const Iframe = styled("iframe")`
  width: 100%;
  height: 100%;
  border: none;
  object-fit: cover;
`

export default Player
