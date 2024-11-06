import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import FetchData from './FetchData';

export const fetchApplicationData = createAsyncThunk(
    'applicationData/fetchApplicationData',
    async () => {
        try {
            console.log("Fetching Data For Application");
            //Fetches The Data For All Pokemon.
            const response = await FetchData('https://pokeapi.co/api/v2/pokemon?limit=1302');

            //Returns The Response To Whoever Called It.
            return response;
        } catch (error) {
            //Throws An Error.
            throw new Error(error);
        }
    }
);

//Creates A Slice That Holds Data For Our Application.
export const applicationData = createSlice({
    name: 'applicationData',
    initialState: {
        pokemonData: {}, //Hashmap Of All Data.
        paginatedPokemon: null, //Paginated List Of All Data.
        isLoading: null, /* Not Loading By Default */
        error: false, /* No Error By Default */
        errorNumber: null, /* No Error Number By Default */
    },
    reducers: {
        updatePokemonData: (state, action) => {
            //The Action Received Is An Object With Key Value Pairs.
            //For Each Key In The Object, Update That Portion Of The State.
            Object.keys(action.payload).forEach(key => {
                state.pokemonData[key] = {
                    ...state.pokemonData[key], //Maintains The Data Included Prior.
                    ...action.payload[key] //Updates The State With New Data.
                };
            });
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchApplicationData.pending, (state, action) => {
            console.log('Pokemon Data Pending');
            state.isLoading = true; //We Are Loading.
            state.error = false; //No Error While Loading.
        })
        .addCase(fetchApplicationData.fulfilled, (state, action) => {
            console.log('Pokemon Data Fulfilled');
            state.isLoading = false; //We Are No Longer Loading.
            action.payload.results.forEach(element => {
                state.pokemonData[element.name] = element;
            });
            state.error = false; //No Error When We Fulfill The Request.
        })
        .addCase(fetchApplicationData.rejected, (state, action) => {
            console.log('Pokemon Data Rejected');
            state.isLoading = false; //We Are No Longer Loading.
            state.error = true; //Sets The Error To The Messaage Given.
        })
    }
});