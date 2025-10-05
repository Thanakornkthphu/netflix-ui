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
        <video  src={videoTrailer} autoPlay loop controls muted/>
    </Container>
  )
}

const Container = styled(Stack)`
  width: 100vw;
  height: 100vh;
`
export default Player
