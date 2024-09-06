import { configureStore } from '@reduxjs/toolkit';
import {ArtistReducer} from "../Components/Artist/ArtistSlice.ts";
import {AlbumReducer} from "../Components/Album/AlbumSlice.ts";
import {TrackReducer} from "../Components/Track/TrackSlice.ts";
import {UserReducer} from "../Components/User/UserSlice.ts";


export const store = configureStore({
    reducer: {
        artist:ArtistReducer,
        album:AlbumReducer,
        track:TrackReducer,
        user:UserReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;