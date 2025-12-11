import React from "react"
import { Stack, styled } from "@mui/material"
import { FaAngleLeft } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

import { COLORS } from "../Utils/constants"

const Player = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <Container>
      <BackButton onClick={handleBack}>
        <FaAngleLeft />
      </BackButton>
      <VideoFrame
        src="https://www.youtube.com/embed/sBEvEcpnG7k?autoplay=1&mute=0&loop=1&controls=1&playlist=sBEvEcpnG7k"
        allow="autoplay; fullscreen"
        title="Video Player"
      />
    </Container>
  )
}

// Styled Components
const Container = styled(Stack)({
  width: "100vw",
  height: "100vh",
  overflow: "hidden",
  position: "relative",
  backgroundColor: COLORS.backgroundDark,
})

const BackButton = styled("button")({
  position: "absolute",
  top: "20px",
  left: "20px",
  zIndex: 1,
  background: "transparent",
  border: "none",
  cursor: "pointer",
  fontSize: "40px",
  color: COLORS.text,
  padding: "8px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background-color 0.2s ease",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
})

const VideoFrame = styled("iframe")({
  width: "100%",
  height: "100%",
  border: "none",
  objectFit: "cover",
})

export default Player
