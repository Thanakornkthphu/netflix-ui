import React, { useState, useRef } from "react"
import {
  Box,
  Modal,
  Typography,
  IconButton,
  Grid,
  Stack,
  styled,
  Fade,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import CardTrailer from "./CardTrailer"

const ModalExploreAll = ({ open, onClose, category }) => {
  const [hoveredMovieId, setHoveredMovieId] = useState(null)
  const containerRef = useRef(null)

  if (!category) return null

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1300,
      }}
      slotProps={{
        backdrop: {
          timeout: 400,
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.85)",
          },
        },
      }}
    >
      <Fade in={open} timeout={400}>
        <ModalContainer ref={containerRef}>
          {/* Header */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              padding: "20px 30px",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              position: "sticky",
              top: 0,
              backgroundColor: "#181818",
              zIndex: 10,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              {category.name}
            </Typography>
            <IconButton
              onClick={onClose}
              sx={{
                color: "white",
                backgroundColor: "rgba(255,255,255,0.1)",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.2)",
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Stack>

          {/* Movie Grid */}
          <Box sx={{ padding: "30px", paddingBottom: "100px" }}>
            <Grid container spacing={3}>
              {category.movies.map((movie, index) => (
                <Grid
                  item
                  xs={6}
                  sm={4}
                  md={3}
                  lg={2}
                  key={movie.id}
                  sx={{
                    position: "relative",
                    zIndex: hoveredMovieId === movie.id ? 100 : 1,
                    overflow: "visible",
                  }}
                >
                  <CardTrailer
                    movie={movie}
                    randomShowLogo={movie.vote_average > 7}
                    index={index}
                    containerRef={containerRef}
                    onHoverChange={(isHovered) => {
                      if (isHovered) {
                        setHoveredMovieId(movie.id)
                      } else {
                        if (hoveredMovieId === movie.id) {
                          setHoveredMovieId(null)
                        }
                      }
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Footer */}
          <Stack
            sx={{
              padding: "20px 30px",
              borderTop: "1px solid rgba(255,255,255,0.1)",
              position: "sticky",
              bottom: 0,
              backgroundColor: "#181818",
            }}
          >
            <Typography sx={{ color: "#a3a3a3", fontSize: "14px" }}>
              {category.movies.length} titles
            </Typography>
          </Stack>
        </ModalContainer>
      </Fade>
    </Modal>
  )
}

const ModalContainer = styled(Box)`
  width: 90%;
  max-width: 1200px;
  max-height: 85vh;
  background-color: #181818;
  border-radius: 12px;
  overflow-y: auto;
  outline: none;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);

  /* Scale animation */
  animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);

  @keyframes scaleIn {
    0% {
      transform: scale(0.7);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #181818;
  }
  &::-webkit-scrollbar-thumb {
    background: #555;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #777;
  }
`

export default ModalExploreAll
