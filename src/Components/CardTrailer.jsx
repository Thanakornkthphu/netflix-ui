import { Card, CardContent, Stack, styled, Typography } from "@mui/material"
import React, { useRef, useState, useEffect, useCallback } from "react"
import { ReactComponent as NetflixLogo } from "../Assets/netflixIcon.svg"
import ModalCardTrailer from "./ModalCardTrailer"
import MiniPlayer from "./MiniPlayer"

const CardTrailer = ({ movie, randomShowLogo, index, onHoverChange }) => {
  const [isHoverCardTrailer, setIsHoverCardTrailer] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const hoverTimerRef = useRef(null)
  const isMountedRef = useRef(true)
  const movieIdRef = useRef(movie.id)

  useEffect(() => {
    const previousMovieId = movieIdRef.current
    movieIdRef.current = movie.id

    if (previousMovieId !== movie.id) {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current)
        hoverTimerRef.current = null
      }
      if (isHoverCardTrailer) {
        setIsHoverCardTrailer(false)
        onHoverChange?.(false)
      }
    }
  }, [movie.id, isHoverCardTrailer, onHoverChange])

  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current)
        hoverTimerRef.current = null
      }
    }
  }, [])

  const handleMouseEnter = useCallback(() => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current)
      hoverTimerRef.current = null
    }

    const currentMovieId = movieIdRef.current
    hoverTimerRef.current = setTimeout(() => {
      if (isMountedRef.current && movieIdRef.current === currentMovieId) {
        setIsHoverCardTrailer(true)
        onHoverChange?.(true)
      }
    }, 700)
  }, [onHoverChange])

  const handleMouseLeave = useCallback(() => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current)
      hoverTimerRef.current = null
    }
    setIsHoverCardTrailer(false)
    onHoverChange?.(false)
  }, [onHoverChange])

  return (
    <>
      {!isHoverCardTrailer && (
        <Stack
          sx={{
            position: "relative",
            zIndex: -1,
            width: isHoverCardTrailer ? "500px" : "auto",
            height: "100%",
            borderRadius: "10px",
            maxWidth: "400px",
            cursor: "pointer",
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.08)",
            },
          }}
          onClick={() => setOpenModal(true)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {randomShowLogo && (
            <NetflixLogo
              style={{
                position: "absolute",
                top: "15px",
                left: "10px",
                objectFit: "cover",
                width: "30px",
                height: "30px",
              }}
            />
          )}
          <img
            src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
            alt={movie.title}
            style={{ borderRadius: "7px", maxWidth: "500px" }}
          />
        </Stack>
      )}

      {isHoverCardTrailer && (
        <MiniPlayer
          isHoverCardTrailer={isHoverCardTrailer}
          setIsHoverCardTrailer={(value) => {
            setIsHoverCardTrailer(value)
            onHoverChange?.(value)
          }}
          movie={movie}
          index={index}
        />
      )}

      <ModalCardTrailer open={openModal} onClose={() => setOpenModal(false)} />
    </>
  )
}

export default CardTrailer
