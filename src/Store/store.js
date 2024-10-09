import { configureStore } from '@reduxjs/toolkit';
import { pokemonData } from '../API/pokemonDataSlice';
import { searchSlice } from '../Features/Search/searchSlice';

const store = configureStore({
    reducer: {
        pokemonData: pokemonData.reducer, //Configures Reducer For Pokemon Data In Store.
        search: searchSlice.reducer,
    }
});

export default store;