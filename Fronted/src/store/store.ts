import { configureStore } from '@reduxjs/toolkit';
import {ArtistReducer} from "../Components/Artist/ArtistSlice.ts";
import {AlbumReducer} from "../Components/Album/AlbumSlice.ts";


export const store = configureStore({
    reducer: {
        artist:ArtistReducer,
        album:AlbumReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;