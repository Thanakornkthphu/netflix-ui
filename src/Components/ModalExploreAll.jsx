import React, { useState, useRef, useCallback } from "react"
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
import { COLORS, Z_INDEX } from "../Utils/constants"

const ModalExploreAll = ({ open, onClose, category }) => {
  const [hoveredMovieId, setHoveredMovieId] = useState(null)
  const containerRef = useRef(null)

  const handleHoverChange = useCallback(
    (movieId, isHovered) => {
      if (isHovered) {
        setHoveredMovieId(movieId)
      } else if (hoveredMovieId === movieId) {
        setHoveredMovieId(null)
      }
    },
    [hoveredMovieId]
  )

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
        zIndex: Z_INDEX.modal,
      }}
      slotProps={{
        backdrop: {
          timeout: 400,
          sx: { backgroundColor: COLORS.overlay },
        },
      }}
    >
      <Fade in={open} timeout={400}>
        <ModalContainer ref={containerRef}>
          {/* Header */}
          <ModalHeader>
            <Stack flexDirection="row" gap="15px" alignItems="flex-end">
              <Typography variant="h4" fontWeight="bold" color={COLORS.text} lineHeight="33px">
                {category.name} 
              </Typography>
              <Typography color={COLORS.textSecondary} fontSize="14px">
                {category.movies.length} titles found
              </Typography>
            </Stack>
            <CloseButton onClick={onClose} aria-label="Close modal">
              <CloseIcon />
            </CloseButton>
          </ModalHeader>

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
                    onHoverChange={(isHovered) =>
                      handleHoverChange(movie.id, isHovered)
                    }
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

        </ModalContainer>
      </Fade>
    </Modal>
  )
}

// Styled Components
const ModalContainer = styled(Box)({
  width: "90%",
  maxWidth: "1200px",
  maxHeight: "85vh",
  backgroundColor: COLORS.backgroundCard,
  borderRadius: "12px",
  overflowY: "auto",
  outline: "none",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)",
  animation: "scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
  "@keyframes scaleIn": {
    "0%": {
      transform: "scale(0.7)",
      opacity: 0,
    },
    "100%": {
      transform: "scale(1)",
      opacity: 1,
    },
  },
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-track": {
    background: COLORS.backgroundCard,
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#555",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#777",
  },
})

const ModalHeader = styled(Stack)({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px 30px",
  borderBottom: `1px solid ${COLORS.border}`,
  position: "sticky",
  top: 0,
  backgroundColor: COLORS.backgroundCard,
  zIndex: 10,
})

const CloseButton = styled(IconButton)({
  color: COLORS.text,
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
})

export default ModalExploreAll
