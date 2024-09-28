import {Track} from "../../Type.ts";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../store/store.ts";
import {createTrack, deleteTrack, fetchTracks, getTracksOneAlbum, sendTheTrackHistory} from "./TrackThunk.ts";

export interface trackState {
   track:Track[]
    loading:boolean;
    error:boolean;
    deleteLoading:boolean
}


export const initialState:trackState = {
   track:[],
    loading:false,
    error:false,
    deleteLoading:false
}

export const TrackSlice = createSlice<trackState>({
    name:"track",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder.addCase(fetchTracks.pending,(state) => {
            state.loading = true;
            state.error = false;
        });
        builder.addCase(fetchTracks.fulfilled,(state,{payload: tracks}) => {
            state.loading = false;
            state.track = tracks

        });
        builder.addCase(fetchTracks.rejected,(state) => {
            state.loading = false;
            state.error = true;
        });

        builder.addCase(getTracksOneAlbum.pending,(state) => {
            state.loading = true;
            state.error = false;
        });
        builder.addCase(getTracksOneAlbum.fulfilled,(state,{payload:tracks}) => {
            state.loading = false;
            state.track = tracks
        });
        builder.addCase(getTracksOneAlbum.rejected,(state) => {
            state.loading = false;
            state.error = true;
        });

        builder.addCase(sendTheTrackHistory.pending,(state) => {
            state.loading = true;
            state.error = false;
        });
        builder.addCase(sendTheTrackHistory.fulfilled,(state) => {
            state.loading = false;
        });
        builder.addCase(sendTheTrackHistory.rejected,(state) => {
            state.loading = false;
            state.error = true;
        });


        builder.addCase(createTrack.pending,(state) => {
            state.loading = true;
            state.error = false;
        })
        builder.addCase(createTrack.fulfilled,(state) => {
            state.loading = false;
        })
        builder.addCase(createTrack.rejected,(state) => {
            state.loading = false;
            state.error = true;
        })


        builder.addCase(deleteTrack.pending,(state) => {
            state.deleteLoading = true;
            state.error = false;
        });
        builder.addCase(deleteTrack.fulfilled,(state) => {
            state.deleteLoading = false;
        });
        builder.addCase(deleteTrack.rejected,(state) => {
            state.deleteLoading = false;
            state.error = true;
        });


    }
});

export const TrackReducer = TrackSlice.reducer;
export const loadingTrackState = (state: RootState) => state.track.loading;
export const deleteTrackLoading = (state: RootState) => state.track.deleteLoading;
export const tracksState = (state: RootState) => state.track.track;