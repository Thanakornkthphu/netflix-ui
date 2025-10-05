import React from 'react'
import CardTrailer from './CardTrailer'
import { Stack, Typography } from '@mui/material'

const Slider = ({ movies, genres }) => {
  return (
    <div style={{ background: 'black' }}>
        {movies.map((movie) => {
          if (movie.movies.length > 0) {
            return (
              <Stack key={movie.id} sx={{ padding: '0px 30px' }}>
                <Typography mt="80px" mb="10px" sx={{ color: 'white', fontSize: '32px', fontWeight: 'bold' }}>
                  {movie.name}
                </Typography>
  
                <Stack sx={{ flexDirection: 'row', gap: '10px', height: '200px', maxHeight: '200px' }}>
                  {movie.movies.map((m) => (
                      <CardTrailer key={m.id} movie={m} />
                    ))}
                </Stack>
              </Stack>
            )
          }
        })}
    </div>
  )
}

export default Slider