import React, { useState } from "react"
import CardTrailer from "./CardTrailer"
import { Stack, Typography, IconButton } from "@mui/material"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"

const Slider = ({ movies }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null)

  const [sliderStates, setSliderStates] = useState({})

  const handleUpdateState = (index, swiper) => {
    setSliderStates((prev) => ({
      ...prev,
      [index]: {
        isAtBeginning: swiper.isBeginning,
        isAtEnd: swiper.isEnd,
      },
    }))
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
            <Typography
              mt="40px"
              mb="5px"
              ml="20px"
              sx={{ color: "white", fontSize: "32px", fontWeight: "bold" }}
            >
              {movie.name}
            </Typography>

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
              {/* ลูกศรซ้าย */}
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

              {/* Swiper */}
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
                {movie.movies.map((m, i) => (
                  <SwiperSlide
                    key={i}
                    style={{
                      zIndex: hoveredCardIndex === i ? 100 : 1,
                      overflow: "visible",
                    }}
                  >
                    <CardTrailer
                      movie={m}
                      randomShowLogo={m.vote_average > 7}
                      index={i}
                      onHoverChange={(isHovered) =>
                        setHoveredCardIndex(isHovered ? i : null)
                      }
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* ลูกศรขวา */}
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
    </div>
  )
}

export default Slider
