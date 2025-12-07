import React, { useState, useEffect } from "react"
import { Card, CardContent, Stack, Typography, styled } from "@mui/material"
import { getGenresFromIds } from "../Utils/util"
import { ReactComponent as StarIcon } from "../Assets/star.svg"

const MiniPlayer = ({
  isHoverCardTrailer,
  setIsHoverCardTrailer,
  movie,
  index,
}) => {
  const genres = getGenresFromIds(movie.genre_ids)
  const [isVisible, setIsVisible] = useState(false)
  const [lastCardOfScreen, setLastCardOfScreen] = useState(1)

  useEffect(() => {
    const calculateLastCard = () => {
      const width = window.innerWidth
      if (width >= 1200) {
        setLastCardOfScreen(6)
      } else if (width >= 600) {
        setLastCardOfScreen(3)
      } else {
        setLastCardOfScreen(1)
      }
    }

    calculateLastCard()
    window.addEventListener("resize", calculateLastCard)
    return () => window.removeEventListener("resize", calculateLastCard)
  }, [])

  useEffect(() => {
    if (isHoverCardTrailer) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 0)
      return () => clearTimeout(timer)
    } else {
      setIsVisible(false)
    }
  }, [isHoverCardTrailer])

  const getPosition = () => {
    if (index === 0) {
      return { left: "20px" }
    } else if (index >= lastCardOfScreen) {
      return { right: "20px", left: "auto" }
    } else {
      return { left: "-50px" }
    }
  }

  return (
    <Card
      sx={{
        position: "absolute",
        ...getPosition(),
        top: "-50px",
        width: "370px",
        minHeight: "370px",
        height: "auto",
        borderRadius: "8px",
        overflow: "hidden",
        // transform: isHoverCardTrailer
        //   ? isVisible
        //     ? "scale(1.1)"
        //     : "scale(0.85)"
        //   : "scale(0.85)",
        transform: isVisible ? "scale(1.1)" : "scale(0.85)",
        opacity: isHoverCardTrailer ? 1 : 0,
        transition:
          "transform 0.35s cubic-bezier(0.34, 1.56, 0.34, 1), opacity 0.25s ease-out, box-shadow 0.3s ease-out",
        zIndex: 999,
        boxShadow: isHoverCardTrailer
          ? "0px 8px 20px rgba(0,0,0,0.45)"
          : "0px 2px 10px rgba(0,0,0,0.25)",
        cursor: "pointer",
        backgroundColor: "rgb(18, 18, 18)",
        pointerEvents: isHoverCardTrailer ? "auto" : "none",
        transformOrigin: "center center",
        willChange: "transform, opacity",
      }}
      onMouseEnter={() => setIsHoverCardTrailer(true)}
      onMouseLeave={() => setIsHoverCardTrailer(false)}
    >
      <CardContent sx={{ padding: "0px", height: "300px" }}>
        <Iframe
          src="https://www.youtube.com/embed/UdF25ZqWV7g?autoplay=1&mute=0&loop=1&controls=1&playlist=UdF25ZqWV7g"
          allow="autoplay; fullscreen"
        />
      </CardContent>

      <CardContent sx={{ padding: "0px", margin: "0px" }}>
        <Stack sx={{ padding: "0px 15px 0px 15px", gap: "10px" }}>
          <Typography
            variant="subtitle1"
            color="#fff"
            fontSize={"14px"}
            fontWeight={"600"}
          >
            {movie.title || movie.original_name}
          </Typography>
        </Stack>

        <Stack
          mt="10px"
          sx={{
            padding: "0px 15px 0px 15px",
            flexDirection: "row",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <Typography
            variant="subtitle1"
            color="#a2a2a2"
            fontSize={"12px"}
            fontWeight={"500"}
            border={"1px solid white"}
            padding={"0px 3px"}
            lineHeight={"19px"}
            minWidth={"30px"}
            textAlign={"center"}
          >
            {movie.media_type}
          </Typography>
          <StarIcon style={{ width: "14px", height: "14px" }} />
          <Typography
            mt="2px"
            variant="subtitle1"
            color="#a2a2a2"
            fontSize={"12px"}
            fontWeight={"500"}
          >
            {movie.vote_average.toFixed(1)}
          </Typography>
        </Stack>

        <Stack
          mt="10px"
          sx={{
            padding: "0px 15px 0px 15px",
            flexDirection: "row",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Typography
            variant="subtitle1"
            color="#a2a2a2"
            fontSize={"12px"}
            fontWeight={"500"}
          >
            {genres.join(" • ")}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

const Iframe = styled("iframe")`
  width: 100%;
  height: 100%;
  border: none;
  object-fit: cover;
  will-change: transform, opacity;
`

export default MiniPlayer
