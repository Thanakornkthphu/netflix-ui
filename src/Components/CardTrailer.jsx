import { Stack } from '@mui/material'
import React from 'react'
import { ReactComponent as NetflixLogo } from '../Assets/netflixIcon.svg'

const CardTrailer = ({ movie }) => {


  return (
    <Stack sx={{ width: '100%', height: '100%', borderRadius: '10px', maxWidth: '350px', position: 'relative'}}>
      <NetflixLogo style={{ position: 'absolute', top: '15px', left: '10px', objectFit: 'cover', width: '30px', height: '30px' }} />
      <img src={'https://image.tmdb.org/t/p/w500' + movie.backdrop_path} alt={movie.title} style={{ borderRadius: '7px' }} />
    </Stack>
  )
}

export default CardTrailer