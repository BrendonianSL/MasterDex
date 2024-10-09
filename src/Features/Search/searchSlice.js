import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import FetchPokemon from '../../API/FetchPokemon';

export const executeSearch = createAsyncThunk(
    'search/executeSearch',
    async (searchTerm, thunkAPI) => {
        try {
            console.log("In Execute Search With " + searchTerm);
            
            // Fetch the Pokémon data
            const response = await FetchPokemon(searchTerm);
            
            // Assuming FetchPokemon returns parsed data
            if (!response) {
                throw new Error('No data returned from FetchPokemon');
            }

            console.log("Response:", response); // Logs the response
            
            return response; // Return the data directly since it's already parsed
        } catch (error) {
            // Handle the error by passing it to rejectWithValue
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

//Creates Search Feature For Our Application.
export const searchSlice = createSlice({
    name: 'search', // Name Of The Slice.
    initialState: {
        searchTerm: '', // No Search Term Set By User By Default.
        searchData: [], // No Search Found By Default.
        status: null, // No Status By Default.
        error: null, // No Error By Default.
    },
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload; // Update The Search Term To The Payload.
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(executeSearch.pending, (state) => { // Handles Pending Case.
            state.status = 'pending'; // Sets Status To Loading.
            state.error = null; // No Error When Loading.
        })
        .addCase(executeSearch.fulfilled, (state, action) => { // Handles Fulfilled Case.
            state.status = 'fulfilled'; // Sets Status to Fulfilled.
            state.searchData = action.payload; // Sets The Data To The Payload.
            state.error = null; // No Error When We Fulfill The Request.
        })
        .addCase(executeSearch.rejected, (state, action) => { // Handles Rejected Case.
            state.status = 'rejected'; // Sets Status To Rejected.
            state.error = action.payload; // Use action.payload for error message
        })
    }
});
