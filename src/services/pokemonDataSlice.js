import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import FetchData from './FetchData';

//Creates Asynchronous Action For The Pokemon Data Feature.
export const fetchPokemonData = createAsyncThunk(
    'pokemonData/fetchPokemonData',
    async () => {
        try {
            //Defines An Array Of Promises.
            const fetchPromises = [
                FetchData('https://pokeapi.co/api/v2/pokemon?limit=20'),
                FetchData('https://pokeapi.co/api/v2/berry'),
                FetchData('https://pokeapi.co/api/v2/item'),
                FetchData('https://pokeapi.co/api/v2/move'),
            ];

            //Executes All Promises In Tandem Then Returns The Data.
            const response = await Promise.all(fetchPromises);
            console.log(response);
            return response;

        } catch (error) {
            //Throws An Error.
            throw new Error(error);
        }
    }
);

export const updatePokemon = createAsyncThunk(
    'pokemonData/updatePokemon',
    async (pageLink) => {
        try {
            //Attempts To Grab The Page Of Pokemon Requested.
            const response = await FetchData(pageLink);

            //Returns The Response.
            return response;
        } catch (error) {
            //Throws An Error.
            throw new Error(error);
        }
    }
)

//Creates A Slice For The Pokemon Data Feature.
export const pokemonData = createSlice({
    name: 'pokemonData', //Name Of The Feature.
    initialState: { //Sets the Initial State Of The Feature.
        data: {
            pokemon: null, //Holds Pokemon Data Object.
            berries: null, //Holds Berries Data.
            items: null, //Holds All Items..
            moves: null, //Holds All Moves.
        },
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
            state.data = {
                ...state.data, //Spread Operator.
                pokemon: action.payload[0],
                berries: action.payload[1],
                items: action.payload[2],
                moves: action.payload[3],
            }; //Sets The Data To The Payload.
            state.error = null; //No Error When We Fulfill The Request.
        })
        .addCase(fetchPokemonData.rejected, (state, action) => { //Handles Rejected Case.
            state.status = 'rejected'; //Sets Status To Rejected.
            state.error = action.error.message; //Sets The Error To The Messaage Given.
        })
        .addCase(updatePokemon.pending, (state, action) => {
            state.status = 'pending';
            state.error = null;
        })
        .addCase(updatePokemon.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.data = {
                //Spread Operator To Keep Rest Of The State The Same
                ...state.data,
                pokemon: action.payload,
            }
            state.error = null;
        })
        .addCase(updatePokemon.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.error.message;
        })
    }
});