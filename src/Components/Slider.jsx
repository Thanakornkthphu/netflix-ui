import React, { useState } from "react"
import CardTrailer from "./CardTrailer"
import { Stack, Typography, IconButton, Box } from "@mui/material"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import SliderSkeleton from "./SliderSkeleton"
import ModalExploreAll from "./ModalExploreAll"

const Slider = ({ movies, isLoading }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [hoveredMovieId, setHoveredMovieId] = useState(null)
  const [hoveredCategoryIndex, setHoveredCategoryIndex] = useState(null)
  const [exploreModalOpen, setExploreModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const [sliderStates, setSliderStates] = useState({})

  const handleOpenExploreModal = (category) => {
    setSelectedCategory(category)
    setExploreModalOpen(true)
  }

  const handleCloseExploreModal = () => {
    setExploreModalOpen(false)
    setSelectedCategory(null)
  }

  const handleUpdateState = (index, swiper) => {
    setSliderStates((prev) => ({
      ...prev,
      [index]: {
        isAtBeginning: swiper.isBeginning,
        isAtEnd: swiper.isEnd,
      },
    }))
  }

  if (isLoading) {
    return <SliderSkeleton />
  }

  return (
    <div>
      {movies.map((movie, index) => {
        if (movie.movies.length === 0) return null

        const prevId = `prev-${index}`
        const nextId = `next-${index}`
        const isHover = index === hoveredIndex

        const { isAtBeginning, isAtEnd } = sliderStates[index] || {
          isAtBeginning: true,
          isAtEnd: false,
        }

        return (
          <Stack key={index} sx={{ padding: "0px 20px" }}>
            <Stack
              direction="row"
              alignItems="flex-end"
              gap="15px"
              mt="40px"
              mb="5px"
              onMouseEnter={() => setHoveredCategoryIndex(index)}
              onMouseLeave={() => setHoveredCategoryIndex(null)}
              onClick={() =>
                movie.movies.length > 7 && handleOpenExploreModal(movie)
              }
              sx={{
                cursor: movie.movies.length > 7 ? "pointer" : "default",
                width: "fit-content",
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: "32px",
                  fontWeight: "bold",
                  transition: "color 0.2s ease",
                  lineHeight: "37px",
                  "&:hover":
                    movie.movies.length > 7
                      ? {
                          color: "#e5e5e5",
                        }
                      : {},
                }}
              >
                {movie.name}
              </Typography>

              {movie.movies.length > 7 && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    opacity: hoveredCategoryIndex === index ? 1 : 0,
                    transform:
                      hoveredCategoryIndex === index
                        ? "translateX(0)"
                        : "translateX(-10px)",
                    transition: "opacity 0.3s ease, transform 0.3s ease",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#54b9c5",
                      fontSize: "14px",
                      fontWeight: "600",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Explore All
                  </Typography>
                  <Typography
                    sx={{
                      color: "#54b9c5",
                      fontSize: "18px",
                      fontWeight: "bold",
                      transform:
                        hoveredCategoryIndex === index
                          ? "translateX(5px)"
                          : "translateX(0)",
                      transition: "transform 0.3s ease",
                    }}
                  >
                    ››
                  </Typography>
                </Box>
              )}
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              sx={{
                position: "relative",
                zIndex: hoveredIndex === index ? 100 : 1,
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <IconButton
                id={prevId}
                sx={{
                  color: "white",
                  position: "absolute",
                  left: "10px",
                  zIndex: 2,
                  opacity: isHover && !isAtBeginning ? 1 : 0,
                  visibility: isHover && !isAtBeginning ? "visible" : "hidden",
                  transition: "opacity 0.3s ease, visibility 0.3s ease",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
                }}
              >
                <ArrowBackIosNewIcon />
              </IconButton>

              <Swiper
                breakpoints={{
                  0: { slidesPerView: 2 },
                  600: { slidesPerView: 4 },
                  1200: { slidesPerView: 7 },
                }}
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerGroup={6}
                navigation={{
                  prevEl: `#${prevId}`,
                  nextEl: `#${nextId}`,
                }}
                onSlideChange={(swiper) => handleUpdateState(index, swiper)}
                onInit={(swiper) => handleUpdateState(index, swiper)}
                style={{
                  width: "100%",
                  padding: "10px 0",
                  overflow: "visible",
                }}
              >
                {movie &&
                  movie.movies.map((m, i) => (
                    <SwiperSlide
                      key={m.id || i}
                      style={{
                        zIndex: hoveredMovieId === m.id ? 100 : 1,
                        overflow: "visible",
                      }}
                    >
                      <CardTrailer
                        movie={m}
                        randomShowLogo={m.vote_average > 7}
                        index={i}
                        totalCards={movie.movies.length}
                        onHoverChange={(isHovered) => {
                          if (isHovered) {
                            // Immediately reset previous hovered card when hovering new card
                            if (
                              hoveredMovieId !== null &&
                              hoveredMovieId !== m.id
                            ) {
                              setHoveredMovieId(null)
                            }
                            setHoveredMovieId(m.id)
                          } else {
                            // Only reset if this is the currently hovered card
                            if (hoveredMovieId === m.id) {
                              setHoveredMovieId(null)
                            }
                          }
                        }}
                      />
                    </SwiperSlide>
                  ))}
              </Swiper>

              <IconButton
                id={nextId}
                sx={{
                  color: "white",
                  position: "absolute",
                  right: "10px",
                  zIndex: 2,
                  opacity: isHover && !isAtEnd ? 1 : 0,
                  visibility: isHover && !isAtEnd ? "visible" : "hidden",
                  transition: "opacity 0.3s ease, visibility 0.3s ease",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
                }}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </Stack>
          </Stack>
        )
      })}

      {/* Modal Explore All */}
      <ModalExploreAll
        open={exploreModalOpen}
        onClose={handleCloseExploreModal}
        category={selectedCategory}
      />
    </div>
  )
}

export default Slider
