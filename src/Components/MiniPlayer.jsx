import React, { useState, useEffect } from "react"
import {
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
  styled,
} from "@mui/material"
import { getFormattedDate, getGenresFromIds } from "../Utils/util"
import { ReactComponent as StarIcon } from "../Assets/star.svg"
import { ArrowDropDown } from "@mui/icons-material"
import { FaPlay } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { pages } from "../Routers/path"

const getLastCardOfScreen = () => {
  if (typeof window === "undefined") return 6
  const width = window.innerWidth
  if (width >= 1200) return 6
  if (width >= 600) return 3
  return 1
}

const MiniPlayer = ({
  isHoverCardTrailer,
  setIsHoverCardTrailer,
  movie,
  index,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [showMoreInfo, setShowMoreInfo] = useState(false)
  const [lastCardOfScreen, setLastCardOfScreen] = useState(getLastCardOfScreen)

  const genres = getGenresFromIds(movie.genre_ids)
  const navigate = useNavigate()

  useEffect(() => {
    const handleResize = () => {
      setLastCardOfScreen(getLastCardOfScreen())
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
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
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
            padding: "20px 15px 0px 15px",
          }}
        >
          <Button
            onClick={() => {
              navigate(`${pages.player.replace(":id", movie.id)}`)
            }}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              border: "1px solid white",
              padding: "5px 10px",
              borderRadius: "5px",
              gap: "10px",
            }}
          >
            <Typography
              variant="subtitle1"
              color="#FFFFFF"
              fontSize={"14px"}
              fontWeight={"600"}
              textTransform={"capitalize"}
            >
              Play
            </Typography>
            <FaPlay style={{ fontSize: "14px", color: "#FFFFFF" }} />
          </Button>

          <ArrowDropDown
            onClick={() => setShowMoreInfo(!showMoreInfo)}
            sx={{
              color: "white",
              cursor: "pointer",
              transform: showMoreInfo ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease-in-out",
              padding: "5px",
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              border: "1px solid white",
              "&:hover": {
                backgroundColor: "#151515",
                color: "white",
              },
            }}
          />
        </Stack>
        <Stack
          sx={{
            padding: "20px 15px 0px 15px",
            gap: "5px",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="subtitle1"
            color="#fff"
            fontSize={"14px"}
            fontWeight={"600"}
          >
            {movie.title || movie.original_name}
          </Typography>
        </Stack>

        <Stack sx={{ padding: "5px 15px 0px 15px" }}>
          <Typography
            variant="subtitle1"
            color="#fff"
            fontSize={"14px"}
            fontWeight={"400"}
          >
            {movie.release_date ? getFormattedDate(movie.release_date) : ""}
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

        <Stack
          sx={{
            padding: "0px 15px 0px 15px",
            maxHeight: showMoreInfo ? "300px" : "0px",
            opacity: showMoreInfo ? 1 : 0,
            overflow: "hidden",
            transition: "max-height 0.2s ease-in-out, opacity 0.4s ease-in-out",
          }}
        >
          <Typography
            variant="subtitle1"
            color="#a2a2a2"
            fontSize={"12px"}
            fontWeight={"500"}
            marginTop="10px"
            sx={{
              transform: showMoreInfo ? "translateY(0)" : "translateY(-20px)",
              transition: "transform 0.2s ease-in-out",
            }}
          >
            {movie.overview}
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
