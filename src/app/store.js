import { configureStore } from '@reduxjs/toolkit';
import { pokemonData } from '../services/pokemonDataSlice';
import { searchSlice } from '../Features/search/searchSlice';
import { darkModeSlice } from '../Features/darkmode/darkModeSlice';
import { applicationData } from '../services/applicationDataSlice';

const store = configureStore({
    reducer: {
        applicationData: applicationData.reducer,
        search: searchSlice.reducer,
        darkMode: darkModeSlice.reducer,
    }
});

export default store;