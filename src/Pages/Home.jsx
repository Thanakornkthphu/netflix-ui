import React, { useEffect, useMemo } from "react"
import { Box, Button, Stack, Typography, styled } from "@mui/material"
import { FaPlay } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import Slider from "../Components/Slider"
import { getGenres, fetchMovies } from "../Store"
import { pages } from "../Routers/path"
import { COLORS } from "../Utils/constants"

import backgroundImg from "../Assets/home.jpg"
import titleImg from "../Assets/homeTitle.webp"
import { ReactComponent as Top10Icon } from "../Assets/Top10Icon.svg"

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { movies, genres, genresLoaded, isLoading } = useSelector(
    (state) => state.netflix
  )

  useEffect(() => {
    dispatch(getGenres())
  }, [dispatch])

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ type: "all" }))
    }
  }, [genresLoaded, dispatch])

  const categorizedMovies = useMemo(() => {
    return genres.map((genre) => ({
      ...genre,
      movies: movies.filter(
        (movie, index, self) =>
          movie.genre_ids.includes(genre.id) &&
          self.findIndex((m) => m.id === movie.id) === index
      ),
    }))
  }, [genres, movies])

  const handlePlay = () => {
    navigate(pages.player.replace(":id", "123123"))
  }

  return (
    <>
      <Navbar />

      <HeroSection backgroundImg={backgroundImg}>
        <HeroContent>
          <Box sx={{ marginTop: "-100px" }}>
            <img
              src={titleImg}
              alt="Featured Title"
              style={{ width: "700px" }}
            />

            <Stack
              direction="row"
              alignItems="center"
              gap="15px"
              sx={{ marginTop: "20px" }}
            >
              <Top10Icon style={{ width: "50px", maxWidth: "50px" }} />
              <HeroText variant="subtitle">No.2 in Films Today</HeroText>
            </Stack>

            <Stack mt="20px" sx={{ maxWidth: "700px" }}>
              <HeroText variant="description">
                Kids in 1980s Hawkins face secret experiments, supernatural
                forces, and a mysterious girl named Eleven.
              </HeroText>
            </Stack>
          </Box>

          <Box mt="50px">
            <PlayButton onClick={handlePlay}>
              <FaPlay style={{ marginRight: "10px", fontSize: "1.6rem" }} />
              <Typography fontSize="18px" fontWeight="600">
                Play
              </Typography>
            </PlayButton>
          </Box>
        </HeroContent>
      </HeroSection>

      <Box sx={{ marginTop: "-100px" }}>
        <Slider movies={categorizedMovies} isLoading={isLoading} />
      </Box>

      <Footer />
    </>
  )
}

// Styled Components
const HeroSection = styled(Stack)(({ backgroundImg }) => ({
  width: "100vw",
  minHeight: "100vh",
  background: COLORS.backgroundDark,
  backgroundSize: "cover",
  backgroundPosition: "bottom",
  backgroundImage: `linear-gradient(180deg, hsla(0, 0%, 8%, 0) 0, hsla(0, 0%, 8%, .15) 15%, hsla(0, 0%, 8%, .35) 29%, hsla(0, 0%, 8%, .58) 44%, ${COLORS.background}), url(${backgroundImg})`,
  overflowX: "hidden",
}))

const HeroContent = styled(Stack)({
  padding: "100px 60px 30px 60px",
})

const HeroText = styled(Typography)(({ variant }) => ({
  fontSize: variant === "subtitle" ? "1.6rem" : "1.6rem",
  fontWeight: variant === "subtitle" ? 600 : 400,
  color: COLORS.text,
}))

const PlayButton = styled(Button)({
  background: COLORS.text,
  color: COLORS.backgroundDark,
  fontWeight: 600,
  padding: "7px 30px",
  height: "45px",
  marginRight: "25px",
  "&:hover": {
    background: "#d3d3d3",
  },
})

export default Home
