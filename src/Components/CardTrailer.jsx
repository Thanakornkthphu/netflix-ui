import { Card, CardContent, Stack, styled, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import { ReactComponent as NetflixLogo } from '../Assets/netflixIcon.svg'
import ModalCardTrailer from './ModalCardTrailer'
import MiniPlayer from './MiniPlayer'

const CardTrailer = ({ movie, randomShowLogo, index }) => {

  const [isHoverCardTrailer, setIsHoverCardTrailer] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const hoverTimerRef = useRef(null)

  const handleMouseEnter = () => {
    hoverTimerRef.current = setTimeout(() => {
      setIsHoverCardTrailer(true)
    }, 500)
  }

  const handleMouseLeave = () => {
    clearTimeout(hoverTimerRef.current)
    setIsHoverCardTrailer(false)
  }

  return (
    <>
      {!isHoverCardTrailer && (
        <Stack 
          sx={{ 
            position: 'relative', 
            width: isHoverCardTrailer ? '500px' : 'auto',
            height: '100%', 
            borderRadius: '10px', 
            maxWidth: '400px', 
            cursor: 'pointer',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.08)',
            },
          }} 
          onClick={() => setOpenModal(true)}
          onMouseEnter={handleMouseEnter} 
          onMouseLeave={handleMouseLeave}
        >
        {randomShowLogo && (
          <NetflixLogo style={{ position: 'absolute', top: '15px', left: '10px', objectFit: 'cover', width: '30px', height: '30px' }} />
        )}
        <img src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} alt={movie.title} style={{ borderRadius: '7px', maxWidth: '500px' }} />
      </Stack>
      )}

      {isHoverCardTrailer && (
        <MiniPlayer 
          isHoverCardTrailer={isHoverCardTrailer} 
          setIsHoverCardTrailer={setIsHoverCardTrailer} 
          movie={movie} 
          index={index} 
        />
      )}

      <ModalCardTrailer open={openModal} onClose={() => setOpenModal(false)}/>
    </>
  )
}


export default CardTrailer