import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import moviesAPI from "./APIs/APIs"
const initialState = {
  movies: [],
  genresLoaded: false,
  genres: [],
  isLoading: false,
}

export const getGenres = createAsyncThunk("netflix/genres", async () => {
  try {
    const response = await moviesAPI.genreMovies()
    return response.data.genres
  } catch (err) {
    console.error(err)
  }
})

export const fetchMovies = createAsyncThunk(
  "netflix/trending",
  async ({ type }, thunkApi) => {
    const state = thunkApi.getState()
    const genres = state.netflix.genres

    try {
      const response = await moviesAPI.getRawData(type, genres, "")
      console.log("response", response)

      return response
    } catch (error) {
      console.error(error)
    }
  }
)

const netFlixSlice = createSlice({
  name: "netflix",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload
      state.genresLoaded = true
    })

    builder.addCase(fetchMovies.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload
      state.genresLoaded = true
      state.isLoading = false
    })
    builder.addCase(fetchMovies.rejected, (state) => {
      state.isLoading = false
    })
  },
})

export const store = configureStore({
  reducer: {
    netflix: netFlixSlice.reducer,
  },
})
