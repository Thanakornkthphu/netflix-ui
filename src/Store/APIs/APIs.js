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
                    // id: movie.id,
                    // name: movie?.original_name ? movie.original_name : movie.original_title,
                    // image: movie.backdrop_path,
                    // genres: movieGenres.slice(0, 3),
                }
            )
        }
            
    })
  }

const getRawData = async(type, genres, paging) => {
    const moviesArray = []

    for (let i = 0; moviesArray.length < 60 && i < 10; i++) {
        const page = paging ? `&page=${paging}` : ''
        const url = `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}${page}`

        const response = await axios.get(url)

        createArrayFromRawData(response.data.results, moviesArray, genres)
    }

    return moviesArray

}

const moviesAPI = { genreMovies, getRawData }

export default moviesAPI

