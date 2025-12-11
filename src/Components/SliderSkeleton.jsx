import React from "react"
import { Stack, Skeleton, Box, styled } from "@mui/material"

const SKELETON_ROWS = 3
const CARDS_PER_ROW = 7

const SliderSkeleton = () => {
  return (
    <Container>
      {Array.from({ length: SKELETON_ROWS }).map((_, rowIndex) => (
        <RowContainer key={rowIndex}>
          {/* Title Skeleton */}
          <TitleSkeleton variant="text" width={200} height={50} />

          {/* Cards Skeleton */}
          <CardsContainer direction="row">
            {Array.from({ length: CARDS_PER_ROW }).map((_, cardIndex) => (
              <CardWrapper key={cardIndex}>
                <CardSkeleton variant="rectangular" />
              </CardWrapper>
            ))}
          </CardsContainer>
        </RowContainer>
      ))}
    </Container>
  )
}

// Styled Components
const Container = styled("div")({})

const RowContainer = styled(Stack)({
  padding: "0 20px",
})

const TitleSkeleton = styled(Skeleton)({
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  marginTop: "40px",
  marginBottom: "5px",
  marginLeft: "20px",
})

const CardsContainer = styled(Stack)({
  gap: "20px",
  padding: "10px 0",
  overflow: "hidden",
})

const CardWrapper = styled(Box)({
  flexShrink: 0,
  width: `calc((100% - ${(CARDS_PER_ROW - 1) * 20}px) / ${CARDS_PER_ROW})`,
  minWidth: "150px",
})

const CardSkeleton = styled(Skeleton)({
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  borderRadius: "7px",
  paddingTop: "150%", // Aspect ratio for poster
  animation: "pulse 1.5s ease-in-out infinite",
  "@keyframes pulse": {
    "0%": { opacity: 0.6 },
    "50%": { opacity: 0.3 },
    "100%": { opacity: 0.6 },
  },
})

export default SliderSkeleton
