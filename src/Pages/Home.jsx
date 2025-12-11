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
          <Box sx={{ marginTop: { xs: "-40px", md: "-100px" } }}>
            <Box
              component="img"
              src={titleImg}
              alt="Featured Title"
              sx={{
                width: { xs: "200px", sm: "350px", md: "500px", lg: "700px" },
              }}
            />

            <Stack
              direction="row"
              alignItems="center"
              sx={{
                gap: { xs: "8px", sm: "15px" },
                marginTop: { xs: "30px" },
              }}
            >
              <Top10Icon style={{ width: "clamp(30px, 5vw, 50px)" }} />
              <HeroText variant="subtitle">No.2 in Films Today</HeroText>
            </Stack>

            <Stack
              sx={{
                mt: { xs: "30px" },
                maxWidth: { xs: "100%", sm: "500px", md: "700px" },
              }}
            >
              <HeroText variant="description">
                Kids in 1980s Hawkins face secret experiments, supernatural
                forces, and a mysterious girl named Eleven.
              </HeroText>
            </Stack>
          </Box>

          <Box sx={{ mt: { xs: "24px", sm: "40px", md: "50px" } }}>
            <PlayButton onClick={handlePlay}>
              <FaPlay
                style={{
                  marginRight: "8px",
                  fontSize: "clamp(1rem, 2vw, 1.6rem)",
                }}
              />
              <Typography
                sx={{
                  fontSize: { xs: "14px", sm: "16px", md: "18px" },
                  fontWeight: 600,
                }}
              >
                Play
              </Typography>
            </PlayButton>
          </Box>
        </HeroContent>
      </HeroSection>

      <Box>
        <Slider movies={categorizedMovies} isLoading={isLoading} />
      </Box>

      <Footer />
    </>
  )
}

// Styled Components
const HeroSection = styled(Stack)(({ theme, backgroundImg }) => ({
  width: "100vw",
  minHeight: "350px",
  background: COLORS.backgroundDark,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundImage: `linear-gradient(180deg, hsla(0, 0%, 8%, 0) 0, hsla(0, 0%, 8%, .15) 15%, hsla(0, 0%, 8%, .35) 29%, hsla(0, 0%, 8%, .58) 44%, ${COLORS.background}), url(${backgroundImg})`,
  overflowX: "hidden",
  [theme.breakpoints.up("md")]: { backgroundPosition: "bottom" },
  // [theme.breakpoints.up("sm")]: { minHeight: "700px" },
  // [theme.breakpoints.up("lg")]: { minHeight: "700px" },
}))

const HeroContent = styled(Stack)(({ theme }) => ({
  padding: "80px 16px 30px",
  [theme.breakpoints.up("sm")]: { padding: "90px 40px 30px" },
  [theme.breakpoints.up("md")]: { padding: "100px 60px 30px" },
}))

const HeroText = styled(Typography)(({ theme, variant }) => ({
  fontWeight: variant === "subtitle" ? 600 : 400,
  color: COLORS.text,
  fontSize: variant === "subtitle" ? "1rem" : "0.9rem",
  [theme.breakpoints.up("sm")]: {
    fontSize: variant === "subtitle" ? "1.2rem" : "1.1rem",
  },
  [theme.breakpoints.up("md")]: { fontSize: "1.6rem" },
}))

const PlayButton = styled(Button)(({ theme }) => ({
  background: COLORS.text,
  color: COLORS.backgroundDark,
  fontWeight: 600,
  padding: "6px 16px",
  height: "36px",
  "&:hover": { background: "#d3d3d3" },
  [theme.breakpoints.up("sm")]: { padding: "7px 24px", height: "40px" },
  [theme.breakpoints.up("md")]: { padding: "7px 30px", height: "45px" },
}))

export default Home
