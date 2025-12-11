import React, { useState, useEffect } from "react"
import {
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
  styled,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import { ArrowDropDown } from "@mui/icons-material"
import { FaPlay } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

import { getFormattedDate, getGenresFromIds } from "../Utils/util"
import { pages } from "../Routers/path"
import { COLORS, MINI_PLAYER_WIDTH, Z_INDEX } from "../Utils/constants"
import { ReactComponent as StarIcon } from "../Assets/star.svg"

const MiniPlayer = ({
  movie,
  isVisible,
  onHoverChange,
  edgePosition = "center",
  positionOffset = 0,
}) => {
  const [isAnimated, setIsAnimated] = useState(false)
  const [showMoreInfo, setShowMoreInfo] = useState(false)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const playerWidth = isMobile ? 270 : MINI_PLAYER_WIDTH

  const genres = getGenresFromIds(movie.genre_ids)
  const navigate = useNavigate()

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setIsAnimated(true), 0)
      return () => clearTimeout(timer)
    } else {
      setIsAnimated(false)
    }
  }, [isVisible])

  const getPosition = () => {
    switch (edgePosition) {
      case "left":
        return { left: `${positionOffset}px` }
      case "right":
        return { right: `${positionOffset}px`, left: "auto" }
      default:
        return { left: "50%", marginLeft: `-${playerWidth / 2}px` }
    }
  }

  const handlePlay = () => {
    navigate(pages.player.replace(":id", movie.id))
  }

  const toggleMoreInfo = () => {
    setShowMoreInfo((prev) => !prev)
  }

  return (
    <Card
      sx={{
        position: "absolute",
        ...getPosition(),
        top: isMobile ? "-30px" : "-50px",
        width: `${playerWidth}px`,
        minHeight: isMobile ? "280px" : "370px",
        height: "auto",
        borderRadius: "8px",
        overflow: "hidden",
        transform: isAnimated ? "scale(1.1)" : "scale(0.85)",
        opacity: isVisible ? 1 : 0,
        transition:
          "transform 0.35s cubic-bezier(0.34, 1.56, 0.34, 1), opacity 0.25s ease-out, box-shadow 0.3s ease-out",
        zIndex: Z_INDEX.miniPlayer,
        boxShadow: isVisible
          ? "0px 8px 20px rgba(0,0,0,0.45)"
          : "0px 2px 10px rgba(0,0,0,0.25)",
        cursor: "pointer",
        backgroundColor: COLORS.backgroundCard,
        pointerEvents: isVisible ? "auto" : "none",
        transformOrigin: "center center",
        willChange: "transform, opacity",
      }}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
    >
      {/* Video Preview */}
      <CardContent sx={{ padding: 0, height: isMobile ? "200px" : "300px" }}>
        <VideoFrame
          src="https://www.youtube.com/embed/UdF25ZqWV7g?autoplay=1&mute=0&loop=1&controls=1&playlist=UdF25ZqWV7g"
          allow="autoplay; fullscreen"
          title="Movie Preview"
        />
      </CardContent>

      {/* Movie Info */}
      <CardContent sx={{ padding: 0 }}>
        {/* Actions */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ padding: "20px 15px 0" }}
        >
          <PlayButton onClick={handlePlay}>
            <Typography fontSize="14px" fontWeight={600} color={COLORS.text}>
              Play
            </Typography>
            <FaPlay style={{ fontSize: "14px", color: COLORS.text }} />
          </PlayButton>

          <ExpandButton onClick={toggleMoreInfo} $expanded={showMoreInfo}>
            <ArrowDropDown />
          </ExpandButton>
        </Stack>

        {/* Title */}
        <Stack sx={{ padding: "20px 15px 0" }}>
          <Typography fontSize="14px" fontWeight={600} color={COLORS.text}>
            {movie.title || movie.original_name}
          </Typography>
        </Stack>

        {/* Release Date */}
        <Stack sx={{ padding: "5px 15px 0" }}>
          <Typography fontSize="14px" fontWeight={400} color={COLORS.text}>
            {movie.release_date ? getFormattedDate(movie.release_date) : ""}
          </Typography>
        </Stack>

        {/* Media Type & Rating */}
        <Stack
          direction="row"
          alignItems="center"
          gap="5px"
          sx={{ padding: "10px 15px 0" }}
        >
          <MediaTypeBadge>{movie.media_type}</MediaTypeBadge>
          <StarIcon style={{ width: "14px", height: "14px" }} />
          <Typography
            fontSize="12px"
            fontWeight={500}
            color={COLORS.textSecondary}
          >
            {movie.vote_average?.toFixed(1)}
          </Typography>
        </Stack>

        {/* Genres */}
        <Stack sx={{ padding: "10px 15px 0" }}>
          <Typography
            fontSize="12px"
            fontWeight={500}
            color={COLORS.textSecondary}
          >
            {genres.join(" • ")}
          </Typography>
        </Stack>

        {/* Overview (Expandable) */}
        <ExpandableContent $expanded={showMoreInfo}>
          <Typography
            fontSize="12px"
            fontWeight={500}
            color={COLORS.textSecondary}
            sx={{
              marginTop: "10px",
              transform: showMoreInfo ? "translateY(0)" : "translateY(-20px)",
              transition: "transform 0.2s ease-in-out",
            }}
          >
            {movie.overview}
          </Typography>
        </ExpandableContent>
      </CardContent>
    </Card>
  )
}

// Styled Components
const VideoFrame = styled("iframe")({
  width: "100%",
  height: "100%",
  border: "none",
  objectFit: "cover",
})

const PlayButton = styled(Button)({
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  border: `1px solid ${COLORS.text}`,
  padding: "5px 10px",
  borderRadius: "5px",
  gap: "10px",
  textTransform: "capitalize",
})

const ExpandButton = styled("button")(({ $expanded }) => ({
  background: "rgba(255, 255, 255, 0.1)",
  border: `1px solid ${COLORS.text}`,
  borderRadius: "50%",
  padding: "5px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: COLORS.text,
  transform: $expanded ? "rotate(180deg)" : "rotate(0deg)",
  transition: "transform 0.3s ease-in-out, background-color 0.2s ease",
  "&:hover": {
    backgroundColor: "#151515",
  },
}))

const MediaTypeBadge = styled(Typography)({
  fontSize: "12px",
  fontWeight: 500,
  color: COLORS.textSecondary,
  border: `1px solid ${COLORS.text}`,
  padding: "0 3px",
  lineHeight: "19px",
  minWidth: "30px",
  textAlign: "center",
})

const ExpandableContent = styled(Stack)(({ $expanded }) => ({
  padding: "0 15px",
  maxHeight: $expanded ? "300px" : "0",
  opacity: $expanded ? 1 : 0,
  overflow: "hidden",
  transition: "max-height 0.2s ease-in-out, opacity 0.4s ease-in-out",
}))

export default MiniPlayer
