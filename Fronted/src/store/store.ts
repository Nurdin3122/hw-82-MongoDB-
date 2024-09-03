import { configureStore } from '@reduxjs/toolkit';
import {ArtistReducer} from "../Components/Artist/ArtistSlice.ts";


export const store = configureStore({
    reducer: {
        artist:ArtistReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;