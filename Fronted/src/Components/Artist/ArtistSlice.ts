import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../store/store.ts";
import {Artist} from "../../Type.ts";
import {createArtist, deleteArtist, fetchArtists, isPublishedArtist} from "./ArtistThunk.ts";


export interface ArtistState {
    artists:Artist[]
    loading:boolean;
    error:boolean;
    deleteLoading:boolean
    publishedLoading:boolean
}


export const initialState:ArtistState= {
    artists:[],
    loading:false,
    error:false,
    deleteLoading:false,
    publishedLoading:false
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



        builder.addCase(deleteArtist.pending,(state) => {
            state.publishedLoading = true;
            state.error = false;
        });
        builder.addCase(deleteArtist.fulfilled,(state) => {
            state.publishedLoading = false;

        });
        builder.addCase(deleteArtist.rejected,(state) => {
            state.publishedLoading = false;
            state.error = true;
        });



        builder.addCase(isPublishedArtist.pending,(state) => {
            state.deleteLoading = true;
            state.error = false;
        });
        builder.addCase(isPublishedArtist.fulfilled,(state) => {
            state.deleteLoading = false;

        });
        builder.addCase(isPublishedArtist.rejected,(state) => {
            state.deleteLoading = false;
            state.error = true;
        });


    }
});

export const ArtistReducer = ArtistSlice.reducer;
export const loadingState = (state: RootState) => state.artist.loading;
export const artistState = (state: RootState) => state.artist.artists;

export const deleteLoading = (state:RootState) => state.artist.deleteLoading;
export const publishedLoading = (state:RootState) => state.artist.publishedLoading;
