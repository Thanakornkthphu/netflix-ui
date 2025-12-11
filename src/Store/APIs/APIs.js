import axios from "axios"
import { API_KEY, TMDB_BASE_URL } from "../../Utils/constantsTMDBAPI"

const MAX_MOVIES = 100
const MAX_PAGES = 5

/**
 * Fetch movie genres from TMDB API
 */
const getGenres = () => {
  const url = `${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`
  return axios.get(url)
}

/**
 * Process raw movie data from API response
 */
const processMovieData = (movies) => {
  return movies.filter((movie) => movie.backdrop_path && movie.poster_path)
}

/**
 * Fetch trending movies from TMDB API
 * @param {string} type - Type of content (all, movie, tv)
 * @param {Array} genres - List of genres for reference
 * @returns {Promise<Array>} - Array of movies
 */
const getTrendingMovies = async (type = "all") => {
  const movies = []
  let page = 1

  while (movies.length < MAX_MOVIES && page <= MAX_PAGES) {
    const url = `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}&page=${page}`

    try {
      const response = await axios.get(url)
      const processedMovies = processMovieData(response.data.results)
      movies.push(...processedMovies)
    } catch (error) {
      console.error(`Error fetching page ${page}:`, error)
      break
    }

    page++
  }

  return movies
}

/**
 * Fetch movie details by ID
 * @param {number} movieId - Movie ID
 * @returns {Promise} - Movie details
 */
const getMovieDetails = async (movieId) => {
  const url = `${TMDB_BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos`
  return axios.get(url)
}

/**
 * Search movies by query
 * @param {string} query - Search query
 * @returns {Promise} - Search results
 */
const searchMovies = async (query) => {
  const url = `${TMDB_BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
    query
  )}`
  return axios.get(url)
}

const moviesAPI = {
  getGenres,
  getTrendingMovies,
  getMovieDetails,
  searchMovies,
}

export default moviesAPI
