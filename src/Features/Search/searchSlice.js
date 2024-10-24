import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import FetchData from "../../services/FetchData";

//Create Async Thunk Action To Search For The Data Of The Search Term.
export const executeSearch = createAsyncThunk(
    'search/executeSearch', //Name Of The Action.
    async (url) => {
        console.log('In Thunk');
        try {
            //Attempts To Fetch Data Using URL.
            const response = await FetchData(url);

            //Returns The Data That We Searched For.
            return response;
        } catch(error) {
            //Throws An Error.
            throw new Error(error);
        }
    }
);

//The Serach Feature Of Our Application.
export const searchSlice = createSlice({
    name: 'search', //Name Of The Slice/Feature.
    initialState: {
        searchTerm: '', //Search Term Set By User.
        searchData: null, //Search Data Found By Term Used By User.
        status: null, //Status Of The Request.
        error: null, //Error Of The Search.
    },
    reducers: {
        setSearchTerm(state, action) {
            //Sets The Search Term To The Payload.
            state.searchTerm = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(executeSearch.pending, (state, action) => { //Handles Pending Case.
            state.status = 'pending'; //Sets Status To Loading.
            state.error = null; //No Error When Loading.
        })
        .addCase(executeSearch.fulfilled, (state, action) => { //Handles Fulfilled Case.
            state.status = 'resolved'; //Sets Status to Fulfilled.
            console.log('Data In Search Slice Succeeded');
            state.searchData = action.payload; //Sets The Data To The Payload.
            state.error = null; //No Error When We Fulfill The Request.
        })
        .addCase(executeSearch.rejected, (state, action) => { //Handles Rejected Case.
            state.status = 'rejected'; //Sets Status To Rejected.
            state.error = action.error.message; //Sets The Error To The Messaage Given.
        })
    }
});