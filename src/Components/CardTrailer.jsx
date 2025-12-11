import React, { useRef, useState, useEffect, useCallback } from "react"
import { Stack } from "@mui/material"

import MiniPlayer from "./MiniPlayer"
import {
  EDGE_MARGIN,
  MINI_PLAYER_WIDTH,
  getPosterUrl,
} from "../Utils/constants"
import { ReactComponent as NetflixLogo } from "../Assets/netflixIcon.svg"

const HOVER_DELAY = 700

const CardTrailer = ({
  movie,
  randomShowLogo,
  index,
  onHoverChange,
  containerRef,
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [edgePosition, setEdgePosition] = useState("center")
  const [positionOffset, setPositionOffset] = useState(0)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const hoverTimerRef = useRef(null)
  const isMountedRef = useRef(true)
  const movieIdRef = useRef(movie.id)
  const cardRef = useRef(null)

  // Reset state when movie changes
  useEffect(() => {
    const previousMovieId = movieIdRef.current
    movieIdRef.current = movie.id

    if (previousMovieId !== movie.id) {
      clearHoverTimer()
      if (isHovered) {
        setIsHovered(false)
        onHoverChange?.(false)
      }
    }
  }, [movie.id, isHovered, onHoverChange])

  // Cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
      clearHoverTimer()
    }
  }, [])

  const clearHoverTimer = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current)
      hoverTimerRef.current = null
    }
  }

  const calculatePosition = useCallback(() => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()

    // Get container bounds (modal or screen)
    let containerLeft = 0
    let containerRight = window.innerWidth

    if (containerRef?.current) {
      const containerRect = containerRef.current.getBoundingClientRect()
      containerLeft = containerRect.left
      containerRight = containerRect.right
    }

    // Calculate MiniPlayer position
    const cardCenter = rect.left + rect.width / 2
    const miniPlayerLeft = cardCenter - MINI_PLAYER_WIDTH / 2
    const miniPlayerRight = cardCenter + MINI_PLAYER_WIDTH / 2

    // Determine edge position and offset
    if (miniPlayerLeft < containerLeft + EDGE_MARGIN) {
      setEdgePosition("left")
      setPositionOffset(containerLeft + EDGE_MARGIN - rect.left)
    } else if (miniPlayerRight > containerRight - EDGE_MARGIN) {
      setEdgePosition("right")
      setPositionOffset(EDGE_MARGIN - (containerRight - rect.right))
    } else {
      setEdgePosition("center")
      setPositionOffset(0)
    }
  }, [containerRef])

  const handleMouseEnter = useCallback(() => {
    clearHoverTimer()

    const currentMovieId = movieIdRef.current
    hoverTimerRef.current = setTimeout(() => {
      if (isMountedRef.current && movieIdRef.current === currentMovieId) {
        calculatePosition()
        setIsHovered(true)
        onHoverChange?.(true)
      }
    }, HOVER_DELAY)
  }, [onHoverChange, calculatePosition])

  const handleMouseLeave = useCallback(() => {
    clearHoverTimer()
    setIsHovered(false)
    onHoverChange?.(false)
  }, [onHoverChange])

  const handleHoverChange = useCallback(
    (value) => {
      setIsHovered(value)
      onHoverChange?.(value)
    },
    [onHoverChange]
  )

  return (
    <Stack
      ref={cardRef}
      sx={{
        position: "relative",
        width: "auto",
        height: "100%",
        maxWidth: "400px",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Card Poster */}
      <Stack
        sx={{
          position: "relative",
          zIndex: isHovered ? -1 : 1,
          width: "auto",
          height: "100%",
          borderRadius: "10px",
          maxWidth: "400px",
          cursor: "pointer",
          transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
          opacity: isHovered ? 0 : 1,
          visibility: isHovered ? "hidden" : "visible",
          "&:hover": {
            transform: "scale(1.08)",
          },
        }}
      >
        {randomShowLogo && isImageLoaded && (
          <NetflixLogo
            style={{
              position: "absolute",
              top: "15px",
              left: "10px",
              width: "30px",
              height: "30px",
            }}
          />
        )}
        <img
          src={getPosterUrl(movie.poster_path)}
          alt={movie.title || movie.original_name}
          style={{ borderRadius: "7px", maxWidth: "500px" }}
          onLoad={() => setIsImageLoaded(true)}
        />
      </Stack>

      {/* MiniPlayer on Hover */}
      {isHovered && (
        <MiniPlayer
          movie={movie}
          isVisible={isHovered}
          onHoverChange={handleHoverChange}
          edgePosition={edgePosition}
          positionOffset={positionOffset}
        />
      )}
    </Stack>
  )
}

export default CardTrailer
