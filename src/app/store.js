import { configureStore } from '@reduxjs/toolkit';
import { pokemonData } from '../services/pokemonDataSlice';
import { searchSlice } from '../Features/search/searchSlice';

const store = configureStore({
    reducer: {
        pokemonData: pokemonData.reducer, //Configures Reducer For Pokemon Data In Store.
        search: searchSlice.reducer,
        
    }
});

export default store;