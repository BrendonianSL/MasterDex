import { configureStore } from '@reduxjs/toolkit';
import { pokemonData } from '../services/pokemonDataSlice';
import { searchSlice } from '../Features/search/searchSlice';
import { darkModeSlice } from '../Features/darkmode/darkModeSlice';

const store = configureStore({
    reducer: {
        pokemonData: pokemonData.reducer, //Configures Reducer For Pokemon Data In Store.
        search: searchSlice.reducer,
        darkMode: darkModeSlice.reducer,
    }
});

export default store;