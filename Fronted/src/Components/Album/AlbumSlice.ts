import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../store/store.ts";
import {Album} from "../../Type.ts";
import {createAlbum, fetchAlbums, getOneAlbum} from "./AlbumThunk.ts";


export interface AlbumState {
    albums:Album[]
    loading:boolean;
    error:boolean;
}


export const initialState:AlbumState = {
    albums:[],
    loading:false,
    error:false,
}

export const AlbumSlice = createSlice<AlbumState>({
    name:"album",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder.addCase(fetchAlbums.pending,(state) => {
            state.loading = true;
            state.error = false;
        });
        builder.addCase(fetchAlbums.fulfilled,(state,{payload: albums}) => {
            state.loading = false;
            state.albums = albums

        });
        builder.addCase(fetchAlbums.rejected,(state) => {
            state.loading = false;
            state.error = true;
        });


        builder.addCase(getOneAlbum.pending,(state) => {
            state.loading = true;
            state.error = false;
        });
        builder.addCase(getOneAlbum.fulfilled,(state,{payload:albums}) => {
            state.loading = false;
            state.albums = albums
        });
        builder.addCase(getOneAlbum.rejected,(state) => {
            state.loading = false;
            state.error = true;
        });




        builder.addCase(createAlbum.pending,(state) => {
            state.loading = true;
            state.error = false;
        })
        builder.addCase(createAlbum.fulfilled,(state) => {
            state.loading = false;
        })
        builder.addCase(createAlbum.rejected,(state) => {
            state.loading = false;
            state.error = true;
        });

    }
});

export const AlbumReducer = AlbumSlice.reducer;
export const loadingAlbumState = (state: RootState) => state.album.loading;
export const albumsState = (state: RootState) => state.album.albums;