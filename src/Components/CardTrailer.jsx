import { Card, CardContent, Stack, styled, Typography } from "@mui/material"
import React, { useRef, useState, useEffect, useCallback } from "react"
import { ReactComponent as NetflixLogo } from "../Assets/netflixIcon.svg"
import ModalCardTrailer from "./ModalCardTrailer"
import MiniPlayer from "./MiniPlayer"

const EDGE_MARGIN = 50 // ระยะห่างจากขอบจอ

const CardTrailer = ({ movie, randomShowLogo, index, onHoverChange }) => {
  const [isHoverCardTrailer, setIsHoverCardTrailer] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [edgePosition, setEdgePosition] = useState("center") // "left" | "center" | "right"
  const [positionOffset, setPositionOffset] = useState(0) // offset สำหรับปรับตำแหน่ง

  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const hoverTimerRef = useRef(null)
  const isMountedRef = useRef(true)
  const movieIdRef = useRef(movie.id)
  const cardRef = useRef(null)

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
        // คำนวณตำแหน่งจริงบนหน้าจอ
        if (cardRef.current) {
          const rect = cardRef.current.getBoundingClientRect()
          const screenWidth = window.innerWidth
          const miniPlayerWidth = 370

          // คำนวณว่า MiniPlayer จะอยู่ที่ไหนถ้าอยู่กึ่งกลางการ์ด
          const cardCenter = rect.left + rect.width / 2
          const miniPlayerLeft = cardCenter - miniPlayerWidth / 2
          const miniPlayerRight = cardCenter + miniPlayerWidth / 2

          // ถ้า MiniPlayer จะล้นซ้าย
          if (miniPlayerLeft < EDGE_MARGIN) {
            setEdgePosition("left")
            // คำนวณ offset เพื่อให้ห่างจากขอบซ้าย EDGE_MARGIN px
            setPositionOffset(EDGE_MARGIN - rect.left)
          }
          // ถ้า MiniPlayer จะล้นขวา
          else if (miniPlayerRight > screenWidth - EDGE_MARGIN) {
            setEdgePosition("right")
            // คำนวณ offset เพื่อให้ห่างจากขอบขวา EDGE_MARGIN px
            setPositionOffset(EDGE_MARGIN - (screenWidth - rect.right))
          } else {
            setEdgePosition("center")
            setPositionOffset(0)
          }
        }

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
      {/* CardTrailer - ยังคงแสดงอยู่เสมอเพื่อเป็น placeholder */}
      <Stack
        sx={{
          position: "relative",
          zIndex: isHoverCardTrailer ? -1 : 1,
          width: "auto",
          height: "100%",
          borderRadius: "10px",
          maxWidth: "400px",
          cursor: "pointer",
          transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
          opacity: isHoverCardTrailer ? 0 : 1,
          visibility: isHoverCardTrailer ? "hidden" : "visible",
          "&:hover": {
            transform: "scale(1.08)",
          },
        }}
        onClick={() => setOpenModal(true)}
      >
        {randomShowLogo && isImageLoaded && (
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
          onLoad={() => setIsImageLoaded(true)}
        />
      </Stack>

      {/* MiniPlayer - แสดงทับ CardTrailer เมื่อ hover */}
      {isHoverCardTrailer && (
        <MiniPlayer
          isHoverCardTrailer={isHoverCardTrailer}
          setIsHoverCardTrailer={(value) => {
            setIsHoverCardTrailer(value)
            onHoverChange?.(value)
          }}
          movie={movie}
          edgePosition={edgePosition}
          positionOffset={positionOffset}
        />
      )}

      <ModalCardTrailer open={openModal} onClose={() => setOpenModal(false)} />
    </Stack>
  )
}

export default CardTrailer
