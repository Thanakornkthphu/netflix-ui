import React, { Children, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import { Box, Button, Stack, Typography, styled } from '@mui/material'
import backgroundImg from '../Assets/home.jpg'
import title from '../Assets/homeTitle.webp'
import { FaPlay, FaExclamationCircle, FaAngleLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { pages } from '../Routers/path'
import { useDispatch, useSelector } from 'react-redux'
import { getGenres, fetchMovies } from '../Store'
import CardTrailer from '../Components/CardTrailer'
import Slider from '../Components/Slider'

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const movies = useSelector(state => state.netflix.movies)
  const genres = useSelector(state => state.netflix.genres)
  const genresLoaded = useSelector(state => state.netflix.genresLoaded)

  useEffect(() => {
      dispatch(getGenres())
  }, [])

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ type: 'all' }))
    }

  }, [genresLoaded])

  const dataMovies = genres.map((genre) => {
    return {
      ...genre,
      movies: movies
        .filter((movie, index, self) => 
          movie.genre_ids.includes(genre.id) &&
          self.findIndex(m => m.id === movie.id) === index
        )
    }
  })

  console.log(dataMovies)

  return (
    <>
      <Stack 
        sx={{ 
          width: '100vw', minHeight: '100vh', 
          background: 'black', 
          backgroundImage: `linear-gradient(#00000069, #00000069), url(${backgroundImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',
          overflowX: 'hidden',
        }}
      >
        <Stack sx={{ padding: '30px 60px'}}>
          <Navbar />
          <Stack sx={{ position: 'absolute', bottom: '15rem' }}>
            <Box>
              <img src={title} alt={title} style={{ width: '700px' }}/>
            </Box>
            <Box mt="50px">
              <ButtonStyled sx={{ marginRight: '25px' }} onClick={() => navigate(`${pages.player}`)}>
                <FaPlay style={{ marginRight: '10px' }} /> Play
              </ButtonStyled>
              <ButtonStyled sx={{ background: 'linear-gradient(#5f5f5fa1, #5f5f5fa1)', color: 'white' }}>
                <FaExclamationCircle style={{ marginRight: '10px' }} /> More Info
              </ButtonStyled>
            </Box>
          </Stack>
        </Stack>
      </Stack>
      <Stack sx={{ paddingBottom: '100px' }}>
        <Slider movies={dataMovies} genres={genres}/>
      </Stack>
    </>
  )
}

const ButtonStyled = styled(Button)`
  background: white;
  color: black;
  font-weight: 600;
  padding: 7px 30px;

  :hover {
    background: #d3d3d3;
  }
`

export default Home