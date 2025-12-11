import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import moviesAPI from "./APIs/APIs"

// Initial State
const initialState = {
  movies: [],
  genres: [],
  genresLoaded: false,
  isLoading: false,
  error: null,
}

// Async Thunks
export const getGenres = createAsyncThunk(
  "netflix/getGenres",
  async (_, { rejectWithValue }) => {
    try {
      const response = await moviesAPI.getGenres()
      return response.data.genres
    } catch (error) {
      console.error("Error fetching genres:", error)
      return rejectWithValue(error.message)
    }
  }
)

export const fetchMovies = createAsyncThunk(
  "netflix/fetchMovies",
  async ({ type }, { getState, rejectWithValue }) => {
    try {
      const { genres } = getState().netflix
      const movies = await moviesAPI.getTrendingMovies(type, genres)
      return movies
    } catch (error) {
      console.error("Error fetching movies:", error)
      return rejectWithValue(error.message)
    }
  }
)

// Slice
const netflixSlice = createSlice({
  name: "netflix",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Genres
      .addCase(getGenres.pending, (state) => {
        state.error = null
      })
      .addCase(getGenres.fulfilled, (state, action) => {
        state.genres = action.payload
        state.genresLoaded = true
      })
      .addCase(getGenres.rejected, (state, action) => {
        state.error = action.payload
      })
      // Fetch Movies
      .addCase(fetchMovies.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload
        state.isLoading = false
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

// Actions
export const { clearError } = netflixSlice.actions

// Store
export const store = configureStore({
  reducer: {
    netflix: netflixSlice.reducer,
  },
})

// Selectors
export const selectMovies = (state) => state.netflix.movies
export const selectGenres = (state) => state.netflix.genres
export const selectIsLoading = (state) => state.netflix.isLoading
export const selectGenresLoaded = (state) => state.netflix.genresLoaded
export const selectError = (state) => state.netflix.error
