import React from "react";
import { Card, CardContent, Stack, Typography, styled } from "@mui/material";
import { getGenresFromIds } from "../Utils/util";
import { ReactComponent as StarIcon } from '../Assets/star.svg'

const MiniPlayer = ({ isHoverCardTrailer, setIsHoverCardTrailer, movie, index }) => {
    console.log('movie', movie)

    const genres = getGenresFromIds(movie.genre_ids)
    return (
        <Card 
            sx={{
            position: "absolute",
            left: index === 0 ? '50px' : '-50px',
            width: "370px",
            minHeight: "370px",
            height: 'auto',
            borderRadius: "10px",
            overflow: "hidden",
            transform: isHoverCardTrailer ? "scale(1.3)" : "scale(1)",
            transition: "transform 1.3s ease-in-out",
            zIndex: isHoverCardTrailer ? 100 : 1,
            boxShadow: isHoverCardTrailer
                ? "0 8px 30px rgba(0,0,0,0.6)"
                : "0 2px 10px rgba(0,0,0,0.3)",
            cursor: "pointer",
            backgroundColor: "black",
            pointerEvents: isHoverCardTrailer ? 'auto' : 'none',
            }}
            onMouseEnter={() => setIsHoverCardTrailer(true)} 
            onMouseLeave={() => setIsHoverCardTrailer(false)}
        >
            <CardContent sx={{ padding: '0px', height: '300px' }}>
                <Iframe
                    src="https://www.youtube.com/embed/UdF25ZqWV7g?autoplay=1&mute=0&loop=1&controls=1&playlist=UdF25ZqWV7g"
                    allow="autoplay; fullscreen"
                />
            </CardContent>

            <CardContent sx={{ padding: '0px', margin: '0px' }}>
                <Stack sx={{ padding: '0px 15px 0px 15px', gap: '10px' }}>
                    <Typography variant="subtitle1" color="#fff" fontSize={'14px'} fontWeight={'600'}>
                        {movie.title}
                    </Typography>
                </Stack>

                <Stack mt="10px" sx={{ padding: '0px 15px 0px 15px' , flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
                    <Typography variant="subtitle1" color="#a2a2a2" fontSize={'12px'} fontWeight={'500'} border={'1px solid white'} padding={'0px 3px'} lineHeight={'19px'}>
                        {movie.media_type}
                    </Typography>
                    <StarIcon style={{ width: '14px', height: '14px' }} />
                    <Typography mt="2px" variant="subtitle1" color="#a2a2a2" fontSize={'12px'} fontWeight={'500'}>
                        {movie.vote_average.toFixed(1)}
                    </Typography>
                </Stack>

                <Stack mt="10px" sx={{ padding: '0px 15px 0px 15px' , flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                    <Typography variant="subtitle1" color="#a2a2a2" fontSize={'12px'} fontWeight={'500'}>
                        {genres.join(' • ')}
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    )
}

const Iframe = styled("iframe")`
  width: 100%;
  height: 100%;
  border: none;
  object-fit: cover;
`


export default MiniPlayer;
