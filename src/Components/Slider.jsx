import React, { useState, useCallback } from "react"
import { Stack, Typography, IconButton, Box } from "@mui/material"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"

import CardTrailer from "./CardTrailer"
import SliderSkeleton from "./SliderSkeleton"
import ModalExploreAll from "./ModalExploreAll"
import { COLORS } from "../Utils/constants"

import "swiper/css"
import "swiper/css/navigation"

const MIN_MOVIES_FOR_EXPLORE = 7

const SWIPER_BREAKPOINTS = {
  0: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 8 },
  480: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 10 },
  600: { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 12 },
  900: { slidesPerView: 5, slidesPerGroup: 5, spaceBetween: 15 },
  1200: { slidesPerView: 7, slidesPerGroup: 7, spaceBetween: 18 },
}

const Slider = ({ movies, isLoading }) => {
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null)
  const [hoveredMovieId, setHoveredMovieId] = useState(null)
  const [hoveredCategoryIndex, setHoveredCategoryIndex] = useState(null)
  const [exploreModalOpen, setExploreModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [sliderStates, setSliderStates] = useState({})

  const handleOpenExploreModal = useCallback((category) => {
    setSelectedCategory(category)
    setExploreModalOpen(true)
  }, [])

  const handleCloseExploreModal = useCallback(() => {
    setExploreModalOpen(false)
    setSelectedCategory(null)
  }, [])

  const handleSliderStateChange = useCallback((index, swiper) => {
    setSliderStates((prev) => ({
      ...prev,
      [index]: {
        isAtBeginning: swiper.isBeginning,
        isAtEnd: swiper.isEnd,
      },
    }))
  }, [])

  const handleMovieHover = useCallback(
    (movieId, isHovered) => {
      if (isHovered) {
        setHoveredMovieId(movieId)
      } else if (hoveredMovieId === movieId) {
        setHoveredMovieId(null)
      }
    },
    [hoveredMovieId]
  )

  if (isLoading) {
    return <SliderSkeleton />
  }

  return (
    <Box>
      {movies.map((category, rowIndex) => {
        if (category.movies.length === 0) return null

        const prevId = `prev-${rowIndex}`
        const nextId = `next-${rowIndex}`
        const isRowHovered = rowIndex === hoveredRowIndex
        const hasExploreAll = category.movies.length > MIN_MOVIES_FOR_EXPLORE

        const { isAtBeginning = true, isAtEnd = false } =
          sliderStates[rowIndex] || {}

        return (
          <Stack
            key={rowIndex}
            sx={{ padding: { xs: "0 12px", sm: "0 16px", md: "30px 50px" } }}
          >
            {/* Category Header */}
            <CategoryHeader
              direction="row"
              alignItems="flex-end"
              gap="15px"
              onMouseEnter={() => setHoveredCategoryIndex(rowIndex)}
              onMouseLeave={() => setHoveredCategoryIndex(null)}
              onClick={() => hasExploreAll && handleOpenExploreModal(category)}
              sx={{ cursor: hasExploreAll ? "pointer" : "default" }}
            >
              <CategoryTitle $hasExploreAll={hasExploreAll}>
                {category.name}
              </CategoryTitle>

              {hasExploreAll && (
                <ExploreAllLink $isVisible={hoveredCategoryIndex === rowIndex}>
                  <Typography
                    sx={{
                      color: "#54b9c5",
                      fontSize: "12px",
                      fontWeight: 600,
                      letterSpacing: "0.5px",
                    }}
                  >
                    Explore All
                  </Typography>
                  <Typography
                    sx={{
                      marginBottom: "2px",
                      color: "#54b9c5",
                      fontSize: "18px",
                      fontWeight: "bold",
                      transform:
                        hoveredCategoryIndex === rowIndex
                          ? "translateX(5px)"
                          : "translateX(0)",
                      transition: "transform 0.3s ease",
                    }}
                  >
                    ››
                  </Typography>
                </ExploreAllLink>
              )}
            </CategoryHeader>

            {/* Slider Row */}
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                position: "relative",
                zIndex: hoveredRowIndex === rowIndex ? 100 : 1,
              }}
              onMouseEnter={() => setHoveredRowIndex(rowIndex)}
              onMouseLeave={() => setHoveredRowIndex(null)}
            >
              {/* Previous Button */}
              <NavButton
                id={prevId}
                $isVisible={isRowHovered && !isAtBeginning}
                sx={{ left: "10px" }}
              >
                <ArrowBackIosNewIcon />
              </NavButton>

              {/* Swiper */}
              <Swiper
                breakpoints={SWIPER_BREAKPOINTS}
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerGroup={6}
                navigation={{
                  prevEl: `#${prevId}`,
                  nextEl: `#${nextId}`,
                }}
                onSlideChange={(swiper) =>
                  handleSliderStateChange(rowIndex, swiper)
                }
                onInit={(swiper) => handleSliderStateChange(rowIndex, swiper)}
                style={{
                  width: "100%",
                  padding: "10px 0",
                  overflow: "visible",
                }}
              >
                {category.movies.map((movie, movieIndex) => (
                  <SwiperSlide
                    key={movie.id || movieIndex}
                    style={{
                      zIndex: hoveredMovieId === movie.id ? 100 : 1,
                      overflow: "visible",
                    }}
                  >
                    <CardTrailer
                      movie={movie}
                      randomShowLogo={movie.vote_average > 7}
                      index={movieIndex}
                      onHoverChange={(isHovered) =>
                        handleMovieHover(movie.id, isHovered)
                      }
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Next Button */}
              <NavButton
                id={nextId}
                $isVisible={isRowHovered && !isAtEnd}
                sx={{ right: "10px" }}
              >
                <ArrowForwardIosIcon />
              </NavButton>
            </Stack>
          </Stack>
        )
      })}

      <ModalExploreAll
        open={exploreModalOpen}
        onClose={handleCloseExploreModal}
        category={selectedCategory}
      />
    </Box>
  )
}

// Styled Components
const CategoryHeader = ({ children, ...props }) => (
  <Stack
    sx={{
      mt: { xs: "24px", sm: "32px", md: "40px" },
      mb: "5px",
      width: "fit-content",
    }}
    {...props}
  >
    {children}
  </Stack>
)

const CategoryTitle = ({ children, $hasExploreAll }) => (
  <Typography
    sx={{
      color: COLORS.text,
      fontSize: { xs: "18px", sm: "24px", md: "32px" },
      fontWeight: "bold",
      transition: "color 0.2s ease",
      lineHeight: { xs: "32px", sm: "35px", md: "40px" },
      "&:hover": $hasExploreAll ? { color: "#e5e5e5" } : {},
    }}
  >
    {children}
  </Typography>
)

const ExploreAllLink = ({ children, $isVisible }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: "5px",
      opacity: $isVisible ? 1 : 0,
      transform: $isVisible ? "translateX(0)" : "translateX(-10px)",
      transition: "opacity 0.3s ease, transform 0.3s ease",
    }}
  >
    {children}
  </Box>
)

const NavButton = ({ children, $isVisible, id, sx, ...props }) => (
  <IconButton
    id={id}
    sx={{
      color: COLORS.text,
      position: "absolute",
      zIndex: 2,
      opacity: $isVisible ? 1 : 0,
      visibility: $isVisible ? "visible" : "hidden",
      transition: "opacity 0.3s ease, visibility 0.3s ease",
      backgroundColor: "rgba(0,0,0,0.5)",
      "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
      ...sx,
    }}
    {...props}
  >
    {children}
  </IconButton>
)

export default Slider
