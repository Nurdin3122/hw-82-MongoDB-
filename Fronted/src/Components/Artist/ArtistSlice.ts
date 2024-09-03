import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../store/store.ts";
import {Artist} from "../../Type.ts";
import {createArtist, fetchArtists} from "./ArtistThunk.ts";


export interface ArtistState {
    artists:Artist[]
    loading:boolean;
    error:boolean;
}


export const initialState:ArtistState= {
    artists:[],
    loading:false,
    error:false,
}

export const ArtistSlice = createSlice<ArtistState>({
    name:"artist",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder.addCase(createArtist.pending,(state) => {
            state.loading = true;
            state.error = false;
        });
        builder.addCase(createArtist.fulfilled,(state) => {
            state.loading = false;
        });
        builder.addCase(createArtist.rejected,(state) => {
            state.loading = false;
            state.error = true;
        });


        builder.addCase(fetchArtists.pending,(state) => {
            state.loading = true;
            state.error = false;
        });
        builder.addCase(fetchArtists.fulfilled,(state,{payload: artists}) => {
            state.loading = false;
            state.artists = artists;

        });
        builder.addCase(fetchArtists.rejected,(state) => {
            state.loading = false;
            state.error = true;
        });
    }
});

export const ArtistReducer = ArtistSlice.reducer;
export const loadingState = (state: RootState) => state.artist.loading;
export const artistState = (state: RootState) => state.artist.artists;