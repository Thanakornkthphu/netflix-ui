import axios from 'axios';
import { API_KEY, TMDB_BASE_URL } from '../../Utils/constantsTMDBAPI';

const genreMovies = () => {
    const url = `${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`
    return axios.get(url)
}

const createArrayFromRawData = (responseArray, moviesArray, genres) => {
    responseArray.forEach((movie) => {
        const movieGenres = []

        movie.genre_ids.forEach((genre) => {
            const name = genres.find(({ id }) => id === genre)
            if (name) {
                movieGenres.push(name.name)
            }
        })

        if (movie.backdrop_path) {
            moviesArray.push(
                {
                    ...movie
                }
            )
        }
            
    })
  }

const getRawData = async (type, genres, paging) => {
    const moviesArray = []
    let page = 1 

    while (moviesArray.length < 100 && page <= 5) {
        const url = `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}&page=${page}`

        try {
            const response = await axios.get(url)
            createArrayFromRawData(response.data.results, moviesArray, genres)
        } catch (error) {
            console.error(`Error fetching page ${page}:`, error)
            break  
        }

        page++ 
    }

    return moviesArray
}

const moviesAPI = { genreMovies, getRawData }

export default moviesAPI

