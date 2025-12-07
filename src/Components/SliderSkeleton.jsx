import React from "react"
import { Stack, Skeleton, Box } from "@mui/material"

const SliderSkeleton = () => {
  // Number of skeleton rows to show
  const skeletonRows = 3
  // Number of cards per row based on typical viewport
  const cardsPerRow = 7

  return (
    <div>
      {Array.from({ length: skeletonRows }).map((_, rowIndex) => (
        <Stack key={rowIndex} sx={{ padding: "0px 20px" }}>
          {/* Title skeleton */}
          <Skeleton
            variant="text"
            width={200}
            height={50}
            sx={{
              bgcolor: "rgba(255,255,255,0.1)",
              marginTop: "40px",
              marginBottom: "5px",
              marginLeft: "20px",
            }}
          />

          {/* Cards skeleton */}
          <Stack
            direction="row"
            sx={{
              gap: "20px",
              padding: "10px 0",
              overflow: "hidden",
            }}
          >
            {Array.from({ length: cardsPerRow }).map((_, cardIndex) => (
              <Box
                key={cardIndex}
                sx={{
                  flexShrink: 0,
                  width: "calc((100% - 120px) / 7)",
                  minWidth: "150px",
                }}
              >
                <Skeleton
                  variant="rectangular"
                  sx={{
                    bgcolor: "rgba(255,255,255,0.1)",
                    borderRadius: "7px",
                    paddingTop: "150%", // Aspect ratio for poster
                    animation: "pulse 1.5s ease-in-out infinite",
                    "@keyframes pulse": {
                      "0%": {
                        opacity: 0.6,
                      },
                      "50%": {
                        opacity: 0.3,
                      },
                      "100%": {
                        opacity: 0.6,
                      },
                    },
                  }}
                />
              </Box>
            ))}
          </Stack>
        </Stack>
      ))}
    </div>
  )
}

export default SliderSkeleton
