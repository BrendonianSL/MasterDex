import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import FetchPokemon from '../API/FetchPokemon';

//Creates Asynchronous Action For The Pokemon Data Feature.
export const fetchPokemonData = createAsyncThunk(
    'pokemmonData/fetchPokemonData',
    async (pokemonName, thunkAPI) => {
        try {
            //Fetches Data From The API.
            const response = await FetchPokemon(pokemonName);

            //Returns The Data To Caller.
            return response.results;
        } catch (error) {
            //Throws An Error.
            throw new Error(error);
        }
    }
);

//Creates A Slice For The Pokemon Data Feature.
export const pokemonData = createSlice({
    name: 'pokemonData', //Name Of The Feature.
    initialState: { //Sets the Initial State Of The Feature.
        pokemon: [],
        status: null,
        error: null,
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchPokemonData.pending, (state, action) => { //Handles Pending Case.
            state.status = 'pending'; //Sets Status To Loading.
            state.error = null; //No Error When Loading.
        })
        .addCase(fetchPokemonData.fulfilled, (state, action) => { //Handles Fulfilled Case.
            state.status = 'fulfilled'; //Sets Status to Fulfilled.
            state.pokemon = action.payload; //Sets The Data To The Payload.
            state.error = null; //No Error When We Fulfill The Request.
        })
        .addCase(fetchPokemonData.rejected, (state, action) => { //Handles Rejected Case.
            state.status = 'rejected'; //Sets Status To Rejected.
            state.error = action.error.message; //Sets The Error To The Messaage Given.
        })
    }
});