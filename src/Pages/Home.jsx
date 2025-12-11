import React, { Children, useEffect } from "react"
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import { Box, Button, Stack, Typography, styled } from "@mui/material"
import backgroundImg from "../Assets/home.jpg"
import title from "../Assets/homeTitle.webp"
import { FaPlay } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { pages } from "../Routers/path"
import { useDispatch, useSelector } from "react-redux"
import { getGenres, fetchMovies } from "../Store"
import Slider from "../Components/Slider"
import { ReactComponent as Top10Icon } from "../Assets/Top10Icon.svg"

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const movies = useSelector((state) => state.netflix.movies)
  const genres = useSelector((state) => state.netflix.genres)
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded)
  const isLoading = useSelector((state) => state.netflix.isLoading)

  useEffect(() => {
    dispatch(getGenres())
  }, [])

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ type: "all" }))
    }
  }, [genresLoaded])

  const dataMovies = genres.map((genre) => {
    return {
      ...genre,
      movies: movies.filter(
        (movie, index, self) =>
          movie.genre_ids.includes(genre.id) &&
          self.findIndex((m) => m.id === movie.id) === index
      ),
    }
  })

  return (
    <>
      <Navbar />

      <Stack
        sx={{
          width: "100vw",
          height: "100%",
          minHeight: "100vh",
          background: "black",
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          backgroundImage: `linear-gradient(180deg, hsla(0, 0%, 8%, 0) 0, hsla(0, 0%, 8%, .15) 15%, hsla(0, 0%, 8%, .35) 29%, hsla(0, 0%, 8%, .58) 44%, #141414), url(${backgroundImg})`,
          transition:
            "opacity .4s cubic-bezier(.665, .235, .265, .8) 0s, visibility .4s cubic-bezier(.665, .235, .265, .8) 0s",
          overflowX: "hidden",
        }}
      >
        <Stack sx={{ padding: "100px 60px 30px 60px" }}>
          <Box sx={{ marginTop: "-100px" }}>
            <img src={title} alt={title} style={{ width: "700px" }} />

            <Stack
              sx={{
                marginTop: "20px",
                flexDirection: "row",
                gap: "15px",
                alignItems: "center",
              }}
            >
              <Top10Icon style={{ width: "50px", maxWidth: "50px" }} />
              <Typography
                style={{
                  fontSize: "1.6rem",
                  fontWeight: "600",
                  textTransform: "capitalize",
                  color: "white",
                }}
              >
                No.2 in Films Today
              </Typography>
            </Stack>

            <Stack mt="20px" sx={{ width: "auto", maxWidth: "700px" }}>
              <Typography
                style={{
                  fontSize: "1.6rem",
                  fontWeight: "400",
                  textTransform: "capitalize",
                  color: "white",
                }}
              >
                Kids in 1980s Hawkins face secret experiments, supernatural
                forces, and a mysterious girl named Eleven.
              </Typography>
            </Stack>
          </Box>

          <Box mt="50px" sx={{ position: "relative" }}>
            <ButtonStyled
              onClick={() =>
                navigate(`${pages.player.replace(":id", "123123")}`)
              }
            >
              <FaPlay style={{ marginRight: "10px", fontSize: "1.6rem" }} />
              <Typography
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  textTransform: "capitalize",
                }}
              >
                Play
              </Typography>
            </ButtonStyled>
          </Box>
        </Stack>
      </Stack>

      <Box sx={{ marginTop: "-100px" }}>
        <Slider movies={dataMovies} isLoading={isLoading} />
      </Box>
      <Footer />
    </>
  )
}

const ButtonStyled = styled(Button)`
  background: white;
  color: black;
  font-weight: 600;
  padding: 7px 30px;
  height: 45px;
  margin-right: 25px;

  :hover {
    background: #d3d3d3;
  }
`

export default Home
