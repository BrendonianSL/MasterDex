import { createSlice } from "@reduxjs/toolkit";

export const darkModeSlice = createSlice({
    name: 'darkMode',
    initialState: {
        darkMode: false
    },
    reducers: {
        //Toggle Darks Mode To Be The Opposite Of It's Current Value
        toggleDarkMode: (state) => {
            state.darkMode = !state.darkMode;
        }
    }
});

export const { toggleDarkMode } = darkModeSlice.actions;