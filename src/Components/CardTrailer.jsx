import { Stack } from '@mui/material'
import React from 'react'
import { ReactComponent as NetflixLogo } from '../Assets/netflixIcon.svg'

const CardTrailer = ({ movie, randomShowLogo }) => {

  return (
    <Stack sx={{ width: 'auto', height: '100%', borderRadius: '10px', maxWidth: '400px', position: 'relative', cursor: 'pointer'}}>
      {randomShowLogo && <NetflixLogo style={{ position: 'absolute', top: '15px', left: '10px', objectFit: 'cover', width: '30px', height: '30px' }} />}
      <img src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} alt={movie.title} style={{ borderRadius: '7px', maxWidth: '500px' }} />
    </Stack>
  )
}

export default CardTrailer