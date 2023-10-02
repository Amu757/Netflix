import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_KEY, BASE_URL } from '../utils/constant'
import axios from 'axios'

const initialState = {
    moives: [],
    genresLoaded: false,
    genres: []
}

export const getGenres = createAsyncThunk("netflix/genres", async () => {
    const { data: { genres } } = await axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`)
    return genres;
})


const arrayOfMovieData = (array, moviesArray, genres) => {
    array.forEach((movie) => {
        const moivesGenres = [];
        movie.genre_ids.forEach((genre) => {
            const name = genres.find(({ id }) => id === genre)
            if (name) moivesGenres.push(name.name)
        })
        if (movie.backdrop_path)
            moviesArray.push({
                id: movie.id,
                name: movie?.original_name ? movie.original_name : movie.original_title,
                image: movie.backdrop_path,
                genres: moivesGenres.slice(0, 3)
            })
    })
}

const getMovieData = async (api, genres, paging = false) => {
    const moviesArray = [];

    for (let i = 1; moviesArray.length < 80 && i < 10; i++) {
        const { data: { results }, } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`)
        arrayOfMovieData(results, moviesArray, genres);
    }
    return moviesArray;
}

export const fetchMovies = createAsyncThunk("netflix/trending", async ({ type }, myThunk) => {
    const { netflix: { genres }, } = myThunk.getState();
    return getMovieData(`${BASE_URL}/trending/${type}/week?api_key=${API_KEY}`, genres, true);
})

const NetflixSlice = createSlice({
    name: "Netflix",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getGenres.fulfilled, (state, action) => {
            state.genres = action.payload;
            state.genresLoaded = true;
        })
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
        })
    },
});

export const store = configureStore({
    reducer: {
        netflix: NetflixSlice.reducer
    }
})